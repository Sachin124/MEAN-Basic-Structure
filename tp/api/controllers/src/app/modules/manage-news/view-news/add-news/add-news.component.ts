import { Component, OnInit } from "@angular/core";
import { NewsService } from "../../service/news.service";
import { AlertService } from "../../../../public service/alert.service";
import { DataSharingService } from "../../../../public service/data-sharing.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-news",
  templateUrl: "./add-news.component.html",
  styleUrls: ["./add-news.component.css"]
})
export class AddNewsComponent implements OnInit {
  /*********************************************************** CRUD Operation Start ***********************************************************/

  fileToUpload: File;
  photoPath: any = "./assets/img/news.jpg";
  newsData: any = {};
  isEdited: boolean = false;
  formTitle: string = "Add New News";

  constructor(
    private newsService: NewsService,
    private alertService: AlertService,
    private dataService: DataSharingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataService.currentData.subscribe(res => {
      if (res != null && res != 'null') {
        this.isEdited = true;
        this.newsData = res;
       this.formTitle = `Edit News`;
        this.photoPath = res.photo;
      }
    });
  }

  /*********************************************************** Add News Photo *****************************************************************/

  fileChange(files: FileList) {
    this.photoPath = null;
    let formData: FormData = new FormData();
    this.fileToUpload = files.item(0);
    formData.append("photo", this.fileToUpload, this.fileToUpload.name);
    this.newsService.photoUpload(formData).subscribe(
      res => {
        this.photoPath = res.data.file_name;
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

  /*********************************************************** Add New News *******************************************************************/

  addNews(value) {
    value.photo = this.photoPath;
    this.newsService.addNews(value).subscribe(
      res => {
        this.alertService.showNotification("bottom", "right", res.message);
        this.router.navigate(["/manage-news"]);
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

  editNews(value) {
    value.photo = this.photoPath;
    this.newsService.editNews(this.newsData.news_id, value).subscribe(
      res => {
        this.alertService.showNotification("bottom", "right", res.message);
        this.router.navigate(["/manage-news"]);
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
