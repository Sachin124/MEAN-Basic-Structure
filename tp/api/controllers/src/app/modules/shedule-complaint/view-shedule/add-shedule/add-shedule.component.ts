import { Component, OnInit, OnDestroy } from "@angular/core";
import { AlertService } from "../../../../public service/alert.service";
import { DataSharingService } from "../../../../public service/data-sharing.service";
import { Router } from "@angular/router";
import swal from "sweetalert2";
import { ScheduleService } from "../../service/shedule.service";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: "app-add-shedule",
  templateUrl: "./add-shedule.component.html",
  styleUrls: ["./add-shedule.component.css"]
})
export class AddSheduleComponent implements OnInit, OnDestroy {
  /*********************************************************** CRUD Operation Start ***********************************************************/

  sheduleData: any = {};
  isEdited: boolean = false;
  formTitle: string = "Add New Schedule";
  clientList: any;
  siteList: any;
  employeeList: any;
  complaintTypeList: any;
  // minDate = new Date() + 24 * 60 * 60 * 1000;
  minDate = new Date();
  counter: number;
  isSheduleForm: boolean;
  uploadingLoader: boolean = false;
  constructor(
    private sheduleService: ScheduleService,
    private alertService: AlertService,
    private dataService: DataSharingService,
    private ngxService: NgxUiLoaderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getClientList();
    this.counter = 1;

    this.dataService.currentData.subscribe(res => {
      if (res != null && res != "null" && res != "null") {
        this.ngxService.start();

        this.isEdited = true;
        this.formTitle = `Edit Schedule Task`;
        this.sheduleData = res.obj1;
        let on_date = new Date(this.sheduleData.on_date);
        this.sheduleData.on_date = on_date;
        this.isSheduleForm = res.obj2.isSheduleForm;
      }
    });
    if (this.isSheduleForm == true && this.counter === 1) {
      this.counter = this.counter + 1;
      this.getSiteList(this.sheduleData.client_id);
      this.getEmployeeList();
      this.getComplaintTypeList();
    }
  }

  /*********************************************************** Get Client List *******************************************************************/

  getClientList() {
    this.ngxService.start();

    this.sheduleService.getClientList().subscribe(
      res => {
        if (res.status == true) {
          this.clientList = res.data;
          this.ngxService.stop();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /*********************************************************** Get Site List *******************************************************************/

  getSiteList(client_id) {
    this.sheduleService.getSiteByClient(client_id).subscribe(
      res => {
        if (res.status == true) {
          this.siteList = res.data;
          setTimeout(() => {
            this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
          }, 2000);
        }
      },
      error => {
        this.alertService.showNotification("top", "right", error.error.message);
      }
    );
  }

  /*********************************************************** Get Site List *******************************************************************/

  getEmployeeList() {
    this.sheduleService.getEmployeeList().subscribe(
      res => {
        if (res.status == true) {
          this.employeeList = res.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /*********************************************************** Get Site List *******************************************************************/

  getComplaintTypeList() {
    this.sheduleService.getComplaintTypeList().subscribe(
      res => {
        if (res.status == true) {
          this.complaintTypeList = res.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /*********************************************************** Add New Schedule *******************************************************************/

  addSchedule(value) {
    this.uploadingLoader = true;

    this.sheduleService.addSchedule(value).subscribe(
      res => {
        this.alertService.showNotification("bottom", "right", res.message);
        this.uploadingLoader = false;

        this.router.navigate(["/manage-shedule"]);
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

  /*********************************************************** Edit Selected Schedule *******************************************************************/

  editSchedule(value) {
    this.uploadingLoader = true;

    this.sheduleService
      .editSchedule(this.sheduleData.complaint_id, value)
      .subscribe(
        res => {
          this.alertService.showNotification("bottom", "right", res.message);
          this.uploadingLoader = false;

          this.router.navigate(["/manage-shedule"]);
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

  ngOnDestroy() {
    this.counter = 1;
  }
  /*********************************************************** CRUD Operation End ***********************************************************/
}
