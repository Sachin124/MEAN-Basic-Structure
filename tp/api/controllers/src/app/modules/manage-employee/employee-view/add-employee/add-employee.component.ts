import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { EmployeeService } from "../../service/employee.service";
import { Router } from "@angular/router";
import { DataSharingService } from "../../../../public service/data-sharing.service";
import { AlertService } from "../../../../public service/alert.service";
import { MapsAPILoader } from "@agm/core";
import * as moment from 'moment';
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.css"]
})
export class AddEmployeeComponent implements OnInit {
  /*********************************************************** CRUD Operation Start ***********************************************************/

  fileToUpload: File;
  photoPath: any = "./assets/img/default-avatar.png";
  employeeData: any = {};
  isEdited: boolean = false;
  hidePass = true;
  @ViewChild("search") searchElement;
  @ViewChild("searchTwo") searchElementTwo;
  formTitle: string = "Add New Employee";
  maxDate = new Date();
  model: any = {};
  place: any;
  placeTwo: any;
  uploadingPhotoLoder: boolean = false;
uploadingLoader:boolean = false;
dobValid:any;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private dataService: DataSharingService,
    private alertService: AlertService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {

    let printDate: any;
    printDate = moment().subtract(18, 'year');
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

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementTwo.nativeElement,
        { types: ["establishment"] }
      );

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.placeTwo = place;
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
        });
      });
    });
  }

  ngOnInit() {
    this.dataService.currentData.subscribe(res => {
      if (res != null && res != "null") {
        this.isEdited = true;
       this.formTitle = `Edit ${res.first_name} ${res.middle_name} ${res.last_name}`;
        this.employeeData = res;
        this.photoPath = res.profile_image;
      }else{
        this.employeeData.gender = "male";
        this.employeeData.is_working_now = "1";

      }
    });
  }


  /*********************************************************** Add Employee Photo *****************************************************************/

  fileChange(files: FileList) {
    this.uploadingLoader = true;

    this.photoPath = null;
    let formData: FormData = new FormData();
    this.fileToUpload = files.item(0);
    formData.append("profile_image", this.fileToUpload, this.fileToUpload.name);
    this.employeeService.photoUpload(formData).subscribe(
      res => {
        this.uploadingLoader =false;
        this.photoPath = res.data.file_name;
      },
      error => {
        this.uploadingLoader =false;

        this.alertService.showNotification(
          "bottom",
          "right",
          error.error.message
        );
      }
    );
  }

  /*********************************************************** Add New Employee *******************************************************************/

  addEmployee(formData: NgForm) {  
    let value = formData.value;
    
    if (formData.valid) {
      this.uploadingLoader = true;
   
      if(this.photoPath != './assets/img/default-avatar.png'){
        value.profile_image = this.photoPath;
       }
      if (this.place) {
        value.temporary_address = this.place.formatted_address;
      }
      if (this.placeTwo) {
        value.permanent_address = this.placeTwo.formatted_address;
      }
  
      this.employeeService.addEmployee(value).subscribe(
        res => {
          this.uploadingLoader =false;
  
          this.alertService.showNotification("bottom", "right", res.message);
          this.router.navigate(["/manage-employees"]);
        },
        error => {
          this.uploadingLoader =false;
  
          this.alertService.showNotification(
            "bottom",
            "right",
            error.error.message
          );
        }
      );
    }
   
  }

  /*********************************************************** Edit Selected Employee *******************************************************************/

  editEmployee(formData: NgForm) {
    let value = formData.value;
    if (formData.valid) {
    this.uploadingLoader = true;
    if(this.photoPath != './assets/img/default-avatar.png'){
      value.profile_image = this.photoPath;
     }
    if (this.place) {
      value.temporary_address = this.place.formatted_address;
    }
    if (this.placeTwo) {
      value.permanent_address = this.placeTwo.formatted_address;
    }
    this.employeeService
      .editEmployee(this.employeeData.employee_id, value)
      .subscribe(
        res => {
          this.uploadingLoader = false;
          this.alertService.showNotification("bottom", "right", res.message);
          this.router.navigate(["/manage-employees"]);
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
