import { Component, OnInit } from "@angular/core";
import { ClientService } from "../service/client.service";
import { Router } from "@angular/router";
import { DataSharingService } from "../../../public service/data-sharing.service";
import { AlertService } from "../../../public service/alert.service";
import swal from "sweetalert2";
import { UpperAnimations } from '../../../animation/animation3';

@Component({
  selector: "app-client-view",
  templateUrl: "./client-view.component.html",
  animations: [UpperAnimations],
  styleUrls: ["./client-view.component.css"],
  host: {
    '[@pageAnimations]': ''
  }
})
export class ClientViewComponent implements OnInit {
  rows: any[];
  clientData: any = {};
  loading: boolean;
  errorStatusText: string;
  public page: number = 0;
  count: number;
  noResult: string;
  keyword: any;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private dataService: DataSharingService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.rows = [];

    this.getAllClient("");
  }

  /*********************************************************** Get All Client *******************************************************************/

  getAllClient(keyword) {
    this.keyword = keyword;

    this.loading = true;
    let pageCounter = 0;
    if (this.page != 0) {
      let changedPage = this.page - 1;
      let pages = changedPage;
      pageCounter = Number(pages);
    }

    this.clientService.getAllClient(pageCounter, keyword).subscribe(
      res => {
        if (res.status == true) {
          this.rows = [];
          this.rows = res.data.client_data;
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
        this.rows = [];
        this.loading = false;
        this.noResult = "Search result not found!";
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

  /*********************************************************** Page Change *******************************************************************/

  pageChange(pageNo: any): void {
    this.loading = true;
    this.page = pageNo;
    this.getAllClient(this.keyword);
  }

  /*********************************************************** Search Client *******************************************************************/

  searchClient(keyword) {
    setTimeout(() => {
      this.loading = true;
      let pageCounter = 0;
      if (this.page != 0) {
        let changedPage = this.page - 1;
        let pages = changedPage;
        pageCounter = Number(pages);
      }
      this.getAllClient(keyword);   
    }, 1000);
     
  }

  /*********************************************************** View Selected Client *******************************************************************/

  viewClient(row): void {
    this.clientData = row;
  }

  /*********************************************************** Delete Selected Client *******************************************************************/

  deleteClient(client_id: number) {
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
        this.clientService.deleteClient(client_id).subscribe(
          res => {
            this.alertService.showNotification("bottom", "right", res.message);
            this.getAllClient("");
          },
          error => {
            this.alertService.actionAlert(
              error.error.message,
              "Client Not Deleted",
              "error"
            );
          }
        );
      }
    });
  }

  /*********************************************************** Add  Client *******************************************************************/

  addClient() {
    let selectedClient = null;
    this.dataService.changeData(selectedClient);
    this.router.navigate(["/manage-clients/add-new"]);
  }

  /* Fire this function when edit selected Client */

  editClient(selectedClient) {
    this.dataService.changeData(selectedClient);
    this.router.navigate(["/manage-clients/add-new"]);
  }
}
