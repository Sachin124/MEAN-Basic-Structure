import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
import { saveAs as importedSaveAs } from "file-saver";
import { FAQService } from "../service/faq.service";
import { Router } from "@angular/router";
import { DataSharingService } from "../../../public service/data-sharing.service";
import { AlertService } from "../../../public service/alert.service";
import { UpperAnimations } from '../../../animation/animation3';

@Component({
  selector: "app-view-product",
  templateUrl: "./view-product.component.html",
  styleUrls: ["./view-product.component.css"],
  animations: [UpperAnimations],
  host: {
    '[@pageAnimations]': ''
  }
})
export class ViewProductComponent implements OnInit {
  rows: any[];
  faqData: any = {};
  errorStatusText: string;
  loading: boolean;
  faqProductId: any;
  public page: number = 0;
  count: number;
  noResult: string;
  keyword: any;
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
 
  /*********************************************************** Download File *******************************************************************/

  downloadFile(downloadPath) {
    if (downloadPath) {
      var fileName = "document";
      importedSaveAs(downloadPath, fileName);
    }
  }
  /*********************************************************** Get All Procduct List *******************************************************************/

  getProcductList() {
    this.loading = true;
    let pageCounter = 0;
    if (this.page != 0) {
      let changedPage = this.page - 1;
      let pages = changedPage;
      pageCounter = Number(pages);
    }

    this.faqService.getAllProductList(pageCounter).subscribe(
      res => {
        if (res.status == true) {
          this.rows = [];
          document.body.scrollTop = document.documentElement.scrollTop = 0;

          this.rows = res.data.faq_products_data;
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

  /*********************************************************** View Selected ProductFAQ *******************************************************************/

  viewProductFAQ(row): void {
    this.faqData = row;
  }
  /*********************************************************** Delete Selected ProductFAQ *******************************************************************/

  deleteProductFAQ(faq_product_id: number) {
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
        this.faqService.deleteProductFAQ(faq_product_id).subscribe(
          res => {
            this.alertService.showNotification("bottom", "right", res.message);
            this.getProcductList();
          },
          error => {
            this.alertService.actionAlert(
              error.error.message,
              "ProductFAQ Not Deleted",
              "error"
            );
          }
        );
      }
    });
  }


    /*********************************************************** Page Change *******************************************************************/

    pageChange(pageNo: any): void {
      this.loading = true;
      this.page = pageNo;
      this.getProcductList();
    }
  
    

  /*********************************************************** Add  ProductFAQ *******************************************************************/

  addProductFAQ() {
    let selectedProductFAQ = null;
    this.dataService.changeData(selectedProductFAQ);
    this.router.navigate(["/manage-faq/add-product"]);
  }

  /* Fire this function when edit selected ProductFAQ */

  editProductFAQ(selectedProductFAQ) {
    this.dataService.changeData(selectedProductFAQ);
    this.router.navigate(["/manage-faq/add-product"]);
  }
}
