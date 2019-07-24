import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import { DataSharingService } from "../../../public service/data-sharing.service";
import { AlertService } from "../../../public service/alert.service";
import { ScheduleService } from "../service/shedule.service";
import { UpperAnimations } from "src/app/animation/animation3";

@Component({
  selector: "app-view-shedule",
  templateUrl: "./view-shedule.component.html",
  styleUrls: ["./view-shedule.component.css"],
   animations: [UpperAnimations],
  host: {
    '[@pageAnimations]': ''
  }
})
export class ViewSheduleComponent implements OnInit {
  rows: any[];
  sheduleData: any = {};
  loading: boolean;
  errorStatusText: string;
  public page: number = 0;
  count: number;
  noResult: string;
  keyword: any;
  constructor(
    private sheduleService: ScheduleService,
    private router: Router,
    private dataService: DataSharingService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.rows = [];
    this.getAllSchedule();
  }

  /*********************************************************** Get All Schedule *******************************************************************/

  getAllSchedule() {

    this.loading = true;
    let pageCounter = 0;
    if (this.page != 0) {
      let changedPage = this.page - 1;
      let pages = changedPage;
      pageCounter = Number(pages);
    }
    this.sheduleService.getAllSchedule(pageCounter).subscribe(
      res => {
        if (res.status == true) {
          this.rows = [];
          this.rows = res.data.schedule_complaints_data;
          this.loading = false;
          this.count = res.data.total_results;
          this.noResult = null;
        } else {
          this.rows = [];
          this.noResult = "Search result not found!";
          this.count = 0;
        }
        this.loading = false;
      },
      error => {
        this.loading = false;

        setTimeout(() => {
          if (error.statusText == "Unknown Error") {
            this.loading = false;
            this.errorStatusText = "No Internet Connection";
            // this.alertService.showAlert
            this.alertService.showAlert(this.errorStatusText, "error");
            this.rows = [];
          }
        }, 200);
      }
    );
  }

  /*********************************************************** View Selected Schedule *******************************************************************/

  viewSchedule(row): void {
    this.sheduleData = row;
  }

   /*********************************************************** Page Change *******************************************************************/

   pageChange(pageNo: any): void {
    this.loading = true;
    this.page = pageNo;
    this.getAllSchedule();
  }

    

  /*********************************************************** Add  Schedule *******************************************************************/

  addSchedule() {
    let selectedSchedule = null;
    this.dataService.changeData(selectedSchedule);
    this.router.navigate(["/manage-shedule/add-new-shedule"]);
  }

  /* Fire this function when edit selected Schedule */

  editSchedule(obj1) {

    let obj2 ={
      isSheduleForm: true
    }
     let selectedSchedule = {obj1,obj2}
    this.dataService.changeData(selectedSchedule);
    this.router.navigate(["/manage-shedule/add-new-shedule"]);
  }
}
