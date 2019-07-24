import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
import { FAQService } from "../service/faq.service";
import { Router } from "@angular/router";
import { DataSharingService } from "../../../public service/data-sharing.service";
import { AlertService } from "../../../public service/alert.service";
import { saveAs as importedSaveAs } from "file-saver";
import { UpperAnimations } from '../../../animation/animation3';

@Component({
  selector: "app-view-faqs",
  templateUrl: "./view-faqs.component.html",
  styleUrls: ["./view-faqs.component.css"],
  animations: [UpperAnimations],
  host: {
    '[@pageAnimations]': ''
  }
})
export class ViewFaqsComponent implements OnInit {
  rows: any[];
  faqData: any = {};
  errorStatusText: string;
  loading: boolean;
  productList: any = null;
  tableTitle: string = "FAQ List";
  faqProductId: any;
  public page: number = 0;
  count: number;
  noResult: string;
  constructor(
    private faqService: FAQService,
    private router: Router,
    private dataService: DataSharingService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.rows = [];
    this.getProcductList();
  }

  /*********************************************************** Get All Faq *******************************************************************/

  getAllFaq(value) {
    this.tableTitle = value.faq_product_title + " " + "FAQ List";
    if (value.faq_product_id) {
      this.faqProductId = value.faq_product_id;
    }

    this.loading = true;
    let pageCounter = 0;
    if (this.page != 0) {
      let changedPage = this.page - 1;
      let pages = changedPage;
      pageCounter = Number(pages);
    }

    this.faqService
      .getAllFaq(this.faqProductId, pageCounter)
      .subscribe(
        res => {
          if (res.status == true) {
            this.rows = [];
            this.rows = res.data.faq_data;
            this.loading = false;
            this.count = res.data.total_results;
            this.noResult = null;
          } else {
            this.rows = [];
            this.noResult = "No record found!";
            this.count = 0;
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.alertService.showAlert(error.error.message, "error");
          setTimeout(() => {
            if (error.statusText == "Unknown Error") {
              this.errorStatusText = "No Internet Connection";
              // this.alertService.showAlert
              this.alertService.showAlert(this.errorStatusText, "error");
            }
          }, 200);
          this.rows = [];
        }
      );
  }

  /*********************************************************** Download File *******************************************************************/

  downloadFile(downloadPath) {
    if (downloadPath) {
      var fileName = "document";
      importedSaveAs(downloadPath, fileName);
    }
  }
  /*********************************************************** Get All Procduct List *******************************************************************/

  getProcductList() {
    this.faqService.getProductList().subscribe(
      res => {
        if (res.status == true) {
          this.productList = res.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /*********************************************************** View Selected Faq *******************************************************************/

  viewFaq(row): void {
    this.faqData = row;
  }

  /*********************************************************** Page Change *******************************************************************/

  pageChange(pageNo: any): void {
    this.loading = true;
    this.page = pageNo;
    this.getAllFaq(this.faqProductId);
  }

 

  /*********************************************************** Delete Selected Faq *******************************************************************/

  deleteFaq(faq_id: number) {
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
        this.faqService.deleteFaq(faq_id).subscribe(
          res => {
            this.alertService.showNotification("bottom", "right", res.message);
            this.getAllFaq(this.faqProductId);
          },
          error => {
            this.alertService.actionAlert(
              error.error.message,
              "Faq Not Deleted",
              "error"
            );
          }
        );
      }
    });
  }

  /*********************************************************** Add  Faq *******************************************************************/

  addFaq() {
    let selectedFaq = null;
    this.dataService.changeData(selectedFaq);
    this.router.navigate(["/manage-faq/add-new"]);
  }

  /* Fire this function when edit selected Faq */

  editFaq(selectedFaq) {
    this.dataService.changeData(selectedFaq);
    this.router.navigate(["/manage-faq/add-new"]);
  }
}
