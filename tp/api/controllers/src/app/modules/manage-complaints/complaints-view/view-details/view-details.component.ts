import { Component, OnInit, TemplateRef } from "@angular/core";
import { ComplaintService } from "../../service/complaint.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "../../../../public service/alert.service";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import {
  AppDateAdapter,
  APP_DATE_FORMATS
} from "../../../../public model/dateFormat";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-view-details",
  templateUrl: "./view-details.component.html",
  styleUrls: ["./view-details.component.css"],
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
export class ViewDetailsComponent implements OnInit {
  rows: any[] = [];
  complaint_type_id: number;
  employeeData: any;
  taskData: any = {};
  minDate = new Date;
  modalRef: BsModalRef;
  constructor(
    private complaintService: ComplaintService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.complaintService
      .getComplaintDetailsById(this.route.snapshot.params["complaint_id"])
      .subscribe(
        res => {
          this.rows.push(res.data);
        },
        error => {
          console.log(error);
        }
      );
  }

/*********************************************************** Get All Complaint *******************************************************************/

getAllEmployees() {
  this.complaintService.getAllEmployees().subscribe(
    res => {
      this.employeeData = res.data;
    },
    error => {}
  );
}


  /*  If compareWith is given, Angular selects option by the return value of the function. */

  compareFn(user1: any, user2: any) {
    return user1 && user2
      ? user1.employee_id === user2.employee_id
      : user1 === user2;
  }

  /*  Call this function for open model when admin want to assign complaint to the employee */


  openModal(assignTaskModal: TemplateRef<any>) {
    this.modalRef = this.modalService.show(assignTaskModal);
  }
  
  /*  Call this function when admin assign to complaint to the employee */

  assignNow(taskData: any) {
    let taskAssginData: any = {
      complaint_id: Number(this.route.snapshot.params["complaint_id"]),
      employee_id: Number(taskData.employee_id),
      on_date: taskData.on_date
    };
    this.complaintService.assignTask(taskAssginData).subscribe(
      res => {
        this.modalRef.hide();
        this.alertService.showNotification("bottom", "right", res.message);
        this.router.navigate(['/manage-complaints']);
      },
      error => {
        console.log(error);
        this.alertService.showNotification(
          "bottom",
          "right",
          error.error.message
        );
      }
    );
  }
}
