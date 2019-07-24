import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
import { ComplaintService } from "../service/complaint.service";
import { Router } from "@angular/router";
import { DataSharingService } from "../../../public service/data-sharing.service";
import { AlertService } from "../../../public service/alert.service";
import { UpperAnimations } from '../../../animation/animation3';

@Component({
  selector: "app-complaints-view",
  templateUrl: "./complaints-view.component.html",
  styleUrls: ["./complaints-view.component.css"],
  animations: [UpperAnimations],
  host: {
    '[@pageAnimations]': ''
  }
})
export class ComplaintsViewComponent implements OnInit {
  rows: any[];
  complaintData: any = {};
  errorStatusText: string;
  loading: boolean;
  activePanel: any;
  activePanelLink: any;
  public page: number = 0;
  count: number;
  noResult: string;
  keyword: any = '';
  status_type_id: any;
  constructor(
    private complaintService: ComplaintService,
    private router: Router,
    private dataService: DataSharingService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.rows = [];

    this.getComplaints(0);
    this.dataService.currentActive.subscribe(res => {
      if (res != null && res != "null") {
        this.activePanel = res;
      } else {
        this.activePanel = "link7";
      }
    });
  }

  /*********************************************************** Get All Complaint By Status Id *******************************************************************/

  getComplaints(status_type_id) {
    this.status_type_id = status_type_id;
    this.rows = [];
    this.loading = true;
    let pageCounter = 0;
    if (this.page != 0) {
      let changedPage = this.page - 1;
      let pages = changedPage;
      pageCounter = Number(pages);
    }
    this.complaintService
      .getComplaints(status_type_id, pageCounter)
      .subscribe(
        res => {
          if (res.status == true) {
            this.rows = [];
            this.rows = res.data.complaints_data;
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
          setTimeout(() => {
            this.loading = false;

            if (error.statusText == "Unknown Error") {
              this.errorStatusText = "No Internet Connection";
              // this.alertService.showAlert
              this.alertService.showAlert(this.errorStatusText, "error");
            }
          }, 200);
        }
      );
  }

  /*********************************************************** Get All Complaint By Status Id *******************************************************************/

  viewDetails(complaint_id: number) {
    this.router.navigate(["/manage-complaints/view-details/", complaint_id]);
  }

  /*********************************************************** Page Change *******************************************************************/

  pageChange(pageNo: any): void {
    this.loading = true;
    this.page = pageNo;
    this.getComplaints(this.status_type_id);
  }

  /*********************************************************** Search Complaints *******************************************************************/

  searchComplaints(keyword) {
    setTimeout(() => {
      this.loading = true;
      let pageCounter = 0;
      if (this.page != 0) {
        let changedPage = this.page - 1;
        let pages = changedPage;
        pageCounter = Number(pages);
      }
      this.getComplaints(this.status_type_id);
    }, 1000);
     
   
  }

  /*********************************************************** Get All Complaint *******************************************************************/

  getAllComplaint() {
    this.loading = true;

    this.complaintService.getAllComplaints().subscribe(
      res => {
        if (res.status == true) {
          this.rows = res.data;
        }
        this.loading = false;
      },
      error => {
        setTimeout(() => {
          if (error.statusText == "Unknown Error") {
            this.loading = false;
            this.errorStatusText = "No Internet Connection";
            // this.alertService.showAlert
            this.alertService.showAlert(this.errorStatusText, "error");
          }
        }, 200);
      }
    );
  }

  /*********************************************************** View Selected Complaint *******************************************************************/

  viewComplaint(row): void {
    this.complaintData = row;
  }

  /*********************************************************** Delete Selected Complaint *******************************************************************/

  deleteComplaint(complaint_id: number) {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#dc2265",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger"
    }).then(result => {
      if (result.value) {
        this.complaintService.deleteComplaint(complaint_id).subscribe(
          res => {
            this.alertService.showNotification("bottom", "right", res.message);
            this.getAllComplaint();
          },
          error => {
            this.alertService.actionAlert(
              error.error.message,
              "Service Request Not Deleted",
              "error"
            );
          }
        );
      }
    });
  }

  /*********************************************************** Add  Service Request *******************************************************************/

  addComplaint() {
    let selectedComplaint = null;
    this.dataService.changeData(selectedComplaint);
    this.router.navigate(["/manage-complaints/add-new"]);
  }

  /* Fire this function when edit selected Service Request */

  editComplaint(selectedComplaint) {
    this.dataService.changeData(selectedComplaint);
    this.router.navigate(["/manage-complaints/add-new"]);
  }
}
