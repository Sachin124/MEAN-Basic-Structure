import { Component, OnInit, ViewChild } from "@angular/core";
import { FAQService } from "../../service/faq.service";
import { AlertService } from "../../../../public service/alert.service";
import { DataSharingService } from "../../../../public service/data-sharing.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { InputFile, InputFileComponent } from "ngx-input-file";
import { Observable } from "rxjs";

@Component({
  selector: "app-add-faqs",
  templateUrl: "./add-faqs.component.html",
  styleUrls: ["./add-faqs.component.css"]
})
export class AddFaqsComponent implements OnInit {
  /*********************************************************** CRUD Operation Start ***********************************************************/

  faqData: any = {};
  isEdited: boolean = false;
  formTitle: string = "Add New FAQ";
  uploadFile: any;
  file_name: any = './assets/img/upload.png';
  @ViewChild(InputFileComponent)
  private InputFileComponent: InputFileComponent;
  productList: any;

  constructor(
    private faqService: FAQService,
    private alertService: AlertService,
    private dataService: DataSharingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataService.currentData.subscribe(res => {
      if (res != null && res != "null") {
        this.isEdited = true;
        this.formTitle = `Edit FAQ`;
        this.faqData = res;
        this.file_name = res.document_file;
      }
    });

    this.getProductList();
  }

  /*********************************************************** Add New News *******************************************************************/

  addFaq(value) {
    // value.document_file = this.file_name;
    if(this.file_name != './assets/img/upload.png'){
      value.document_file = this.file_name;
     }
    this.faqService.addFaq(value).subscribe(
      res => {
        this.alertService.showNotification("bottom", "right", res.message);
        this.router.navigate(["/manage-faq/faq"]);
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

  editFaq(value) {
    if(this.file_name != './assets/img/upload.png'){
      value.document_file = this.file_name;
     }

    // if (this.file_name != null) {
    //   value.document_file = this.file_name;
    // }else{
    //   value.document_file = this.file_name;
    // }
    this.faqService.editFaq(this.faqData.faq_id, value).subscribe(
      res => {
        this.alertService.showNotification("bottom", "right", res.message);
        this.router.navigate(["/manage-faq/faq"]);
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

  /*********************************************************** Get Product List *******************************************************************/

  getProductList() {
    this.faqService.getProductList().subscribe(
      res => {
        if (res.data) {
          this.productList = res.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /*********************************************************** File Upload *******************************************************************/

  // handleFileChange(): void {
  //   let formData: FormData = new FormData();
  //   this.uploadFile = this.InputFileComponent.files[0].file;
  //   formData.append("document_file", this.uploadFile, this.uploadFile.name);
  //   this.faqService.faqFileUpload(formData).subscribe(
  //     res => {
  //       this.alertService.showAlert("File Uploded", "success");
  //       this.file_name = res.data.file_name;
  //     },
  //     error => {
  //       this.alertService.showAlert(error.message, "error");
  //     }
  //   );
  // }


    /*********************************************************** File Upload *****************************************************************/

    fileChange(files: FileList) {
      this.file_name = null;
      let formData: FormData = new FormData();
      this.uploadFile = files.item(0);
      formData.append("document_file", this.uploadFile, this.uploadFile.name);
      this.faqService.faqFileUpload(formData).subscribe(
        res => {
          this.file_name = res.data.file_name;
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
