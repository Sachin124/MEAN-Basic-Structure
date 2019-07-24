import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../service/complaint.service';
import { AlertService } from '../../../../public service/alert.service';
import { DataSharingService } from '../../../../public service/data-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-complaints',
  templateUrl: './add-complaints.component.html',
  styleUrls: ['./add-complaints.component.css']
})
export class AddComplaintsComponent implements OnInit {
/*********************************************************** CRUD Operation Start ***********************************************************/

complaintData: any = {};
isEdited: boolean = false;
formTitle: string = "Add New Complaint";

constructor(
  private complaintService: ComplaintService,
  private alertService: AlertService,
  private dataService: DataSharingService,
  private router: Router
) {}

ngOnInit() {
  this.dataService.currentData.subscribe(res => {
    if (res != null && res != 'null') {
      this.formTitle = `Edit`;      
      this.isEdited = true;
      this.complaintData = res;
    }
  });
}


/*********************************************************** Add New News *******************************************************************/

addComplaint(value) {
  this.complaintService.addComplaint(value).subscribe(
    res => {
      this.alertService.showNotification("bottom", "right", res.message);
      this.router.navigate(["/manage-complaints"]);
    },
    error => {
      this.alertService.showNotification(
        "bottom",
        "right",
        error.error.message
      );
    }
  );
}

/*********************************************************** Edit Selected News *******************************************************************/

editComplaint(value) {
  this.complaintService.editComplaint(this.complaintData.complaint_type_id, value).subscribe(
    res => {
      this.alertService.showNotification("bottom", "right", res.message);
      this.router.navigate(["/manage-complaints"]);
    },
    error => {
      this.alertService.showNotification(
        "bottom",
        "right",
        error.error.message
      );
    }
  );
}

/*********************************************************** CRUD Operation End ***********************************************************/
}
