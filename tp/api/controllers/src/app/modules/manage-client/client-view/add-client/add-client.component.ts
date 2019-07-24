/// <reference types="@types/googlemaps" />
import { Component, OnInit, NgZone, ViewChild } from "@angular/core";
import { ClientService } from "../../service/client.service";
import { Router } from "@angular/router";
import { DataSharingService } from "../../../../public service/data-sharing.service";
import { AlertService } from "../../../../public service/alert.service";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter } from "src/app/public model/dateFormat";
import { APP_DATE_FORMATS } from "../../../../public model/dateFormat";
import { MapsAPILoader } from "@agm/core";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { saveAs } from "file-saver";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import * as _ from "lodash";
// import { DatePipe } from "@angular/common";

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.css"],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS
    }
  ]
})
export class AddClientComponent implements OnInit {
  /*********************************************************** CRUD Operation Start ***********************************************************/

  fileToUpload: File;
  photoPath: any = "./assets/img/default-avatar.png";
  clientData: any = {};
  isEdited: boolean = false;
  hidePass = true;
  place: any;
  @ViewChild("search") searchElement;
  formTitle: string = "Add New Client";
  maxDate = new Date();
  uploadingLoader: boolean = false;

  // Image Cropper
  imageChangedEvent: any = "";
  croppedImage: any = "";

  dobValid: any;
  filterValue;
  saveEvents = [];
  eventData: any = {};
  allEvents: any[];
  rowindex: any;
  constructor(
    private clientService: ClientService,
    private alertService: AlertService,
    private dataService: DataSharingService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router
  ) {
    let printDate: any;
    printDate = moment().subtract(18, "year");
    this.dobValid = printDate._d;

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElement.nativeElement,
        { types: ["establishment"] }
      );

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.place = place;
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
        });
      });
    });
  }

  ngOnInit() {
    this.dataService.currentData.subscribe(res => {
      if (res != null && res != "null" && res != "null") {
        this.isEdited = true;
        this.formTitle = `Edit ${res.first_name} ${res.last_name}`;
        this.clientData = res;
        this.photoPath = res.profile_image;
      }
    });
  }

  // searchPlease(value) {
  //   value = this.datePipe.transform(value, 'dd-yyyy-MM');
  //   if (value) {
  //     let found = _.filter(this.saveEvents, ['date', value]);
  //       if(found.length !== 0){
  //         this.allEvents = found;
  //       }else{
  //         this.allEvents = this.saveEvents;
  //       }
  //   }else{
  //     this.allEvents = this.saveEvents;
  //   }
  // }
  // saveEvent(value) {
  //   value.date = this.datePipe.transform(value.date, 'dd-yyyy-MM')

  //   this.saveEvents.push(value);
  //   this.allEvents = this.saveEvents;
  // }

  // deleteEvent(index) {
  //   this.saveEvents.splice(index, 1);
  //   this.allEvents = this.saveEvents;
  // }

  // editEvent(row, index) {
  //   row.date = this.datePipe.transform(row.date, 'dd-yyyy-MM')

  //   this.rowindex = index;
  //   this.eventData = row;
  //   this.allEvents = this.saveEvents;
  // }
  // editNow(value) {
  //   this.saveEvents[this.rowindex] = value;
  // }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(event);
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

  /*********************************************************** Add Client Photo *****************************************************************/

  fileChange(files: FileList) {
    this.uploadingLoader = true;

    this.photoPath = null;
    let formData: FormData = new FormData();
    this.fileToUpload = files.item(0);
    formData.append("profile_image", this.fileToUpload, this.fileToUpload.name);
    this.clientService.photoUpload(formData).subscribe(
      res => {
        this.photoPath = res.data.file_name;
        this.uploadingLoader = false;
      },
      error => {
        this.uploadingLoader = false;

        this.alertService.showNotification(
          "bottom",
          "right",
          error.error.message
        );
      }
    );
  }

  /*********************************************************** Add New Client *******************************************************************/

  addClient(formData: NgForm) {
    let value = formData.value;
    if (formData.valid) {
      this.uploadingLoader = true;

      if (this.photoPath != "./assets/img/default-avatar.png") {
        value.profile_image = this.photoPath;
      }

      if (this.place) {
        value.permanent_address = this.place.formatted_address;
      }

      this.clientService.addClient(value).subscribe(
        res => {
          this.uploadingLoader = false;

          this.alertService.showNotification("bottom", "right", res.message);
          this.router.navigate(["/manage-clients"]);
        },
        error => {
          this.uploadingLoader = false;

          this.alertService.showNotification(
            "bottom",
            "right",
            error.error.message
          );
        }
      );
    }
  }

  /*********************************************************** Edit Selected Client *******************************************************************/

  editClient(formData: NgForm) {
    let value = formData.value;
    if (formData.valid) {
      this.uploadingLoader = true;

      if (this.photoPath != "./assets/img/default-avatar.png") {
        value.profile_image = this.photoPath;
      }
      value.profile_image = this.photoPath;
      if (this.place) {
        value.permanent_address = this.place.formatted_address;
      }
      this.clientService.editClient(this.clientData.client_id, value).subscribe(
        res => {
          this.uploadingLoader = false;

          this.alertService.showNotification("bottom", "right", res.message);
          this.router.navigate(["/manage-clients"]);
        },
        error => {
          this.uploadingLoader = false;

          this.alertService.showNotification(
            "bottom",
            "right",
            error.error.message
          );
        }
      );
    }
  }

  /*********************************************************** CRUD Operation End ***********************************************************/
}
