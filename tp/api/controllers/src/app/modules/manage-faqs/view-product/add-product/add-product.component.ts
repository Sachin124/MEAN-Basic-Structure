import { Component, OnInit } from "@angular/core";
import { AlertService } from "../../../../public service/alert.service";
import { DataSharingService } from "../../../../public service/data-sharing.service";
import { Router } from "@angular/router";
import { FAQService } from "../../service/faq.service";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})
export class AddProductComponent implements OnInit {
  /*********************************************************** CRUD Operation Start ***********************************************************/

  fileToUpload: File;
  photoPath: any = "./assets/img/default-avatar.png";
  productData: any = {};
  isEdited: boolean = false;
  formTitle: string = "Add New Product";
  uploadingLoader: boolean = false;
  constructor(
    private faqService: FAQService,
    private router: Router,
    private dataService: DataSharingService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.dataService.currentData.subscribe(res => {
      if (res != null && res != "null") {
        this.isEdited = true;
        this.formTitle = `Edit ${res.faq_product_title}`;
        this.productData = res;
        this.photoPath = res.faq_product_image;
      }
    });
  }

  /*********************************************************** Add Product Photo *****************************************************************/

  fileChange(files: FileList) {
    this.uploadingLoader = true;

    this.photoPath = null;
    let formData: FormData = new FormData();
    this.fileToUpload = files.item(0);
    formData.append(
      "faq_product_image",
      this.fileToUpload,
      this.fileToUpload.name
    );
    this.faqService.photoUpload(formData).subscribe(
      res => {
        this.photoPath = res.data.file_name;
        this.uploadingLoader = false;
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

  /*********************************************************** Add New Product *******************************************************************/

  addProduct(value) {
    this.uploadingLoader = true;

    if(this.photoPath != './assets/img/default-avatar.png'){
      value.faq_product_image = this.photoPath;
     }
    
    this.faqService.addProduct(value).subscribe(
      res => {
    this.uploadingLoader = false;

        this.alertService.showNotification("bottom", "right", res.message);
        this.router.navigate(["/manage-faq/faq-product"]);
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

  /*********************************************************** Edit Selected Product *******************************************************************/

  editProduct(value) {
    this.uploadingLoader = true;
    if(this.photoPath != './assets/img/default-avatar.png'){
      value.faq_product_image = this.photoPath;
     }
    this.faqService
      .editProduct(this.productData.faq_product_id, value)
      .subscribe(
        res => {
          this.uploadingLoader = false;
          this.alertService.showNotification("bottom", "right", res.message);
          this.router.navigate(["/manage-faq/faq-product"]);
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

  /*********************************************************** CRUD Operation End ***********************************************************/
}
