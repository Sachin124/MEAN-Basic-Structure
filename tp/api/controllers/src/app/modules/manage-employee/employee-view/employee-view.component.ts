import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
import { EmployeeService } from "../service/employee.service";
import { Router } from "@angular/router";
import { DataSharingService } from '../../../public service/data-sharing.service';
import { AlertService } from '../../../public service/alert.service';
import { UpperAnimations } from '../../../animation/animation3';

@Component({
  selector: "app-employee-view",
  templateUrl: "./employee-view.component.html",
  styleUrls: ["./employee-view.component.css"],
  animations: [UpperAnimations],
  host: {
    '[@pageAnimations]': ''
  }
})
export class EmployeeViewComponent implements OnInit {
  rows: any[];
  employeeData: any = {};
  loading: boolean;
  errorStatusText: string;
  loaderImage = 'http://brazoslandcompany.com/img/loading-spinner.gif';
  public page: number = 0;
  count: number;
  noResult: string;
  keyword: any;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private dataService: DataSharingService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.rows = [];

    this.getAllEmployee('');
  }

  /*********************************************************** Get All Employee *******************************************************************/

  getAllEmployee(keyword) {
    this.keyword = keyword;
    this.loading = true;
    let pageCounter = 0;
    if (this.page != 0) {
      let changedPage = this.page - 1;
      let pages = changedPage;
      pageCounter = Number(pages);
    }
    this.employeeService.getAllEmployee(pageCounter,keyword).subscribe(
      res => {
        if (res.status == true) {
          this.rows = [];
          this.rows = res.data.employee_data;
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
          }
        }, 200);
      }
    );
  }

  /*********************************************************** View Selected Employee *******************************************************************/


  viewEmployee(row):void{
    this.employeeData = row;    
  }


  /*********************************************************** Page Change *******************************************************************/

  pageChange(pageNo: any): void {
    this.loading = true;
    this.page = pageNo;
    this.getAllEmployee(this.keyword);
  }

    /*********************************************************** Search Employee *******************************************************************/

    searchEmployee(keyword) {
      setTimeout(() => {
        this.loading = true;
        let pageCounter = 0;
        if (this.page != 0) {
          let changedPage = this.page - 1;
          let pages = changedPage;
          pageCounter = Number(pages);
        }
        this.getAllEmployee(keyword);
      }, 1000);
     
    }
  
  
   
    
  /*********************************************************** Delete Selected Employee *******************************************************************/

  deleteEmployee(employee_id: number) {
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
        this.employeeService.deleteEmployee(employee_id).subscribe(res => {
          this.alertService.showNotification('bottom', 'right', res.message);
          this.getAllEmployee('');
        }, error => {
          this.alertService.actionAlert(error.error.message, 'Employee Not Deleted', 'error');
        });
      }
    });
  }

  /*********************************************************** Add  Employee *******************************************************************/


  addEmployee() {
    let selectedEmployee = null;
    this.dataService.changeData(selectedEmployee);
    this.router.navigate(["/manage-employees/add-new"]);
  }

  /* Fire this function when edit selected Employee */

  editEmployee(selectedEmployee) {
    
    this.dataService.changeData(selectedEmployee);
    this.router.navigate(["/manage-employees/add-new"]);
  }
}
