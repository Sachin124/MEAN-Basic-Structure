import { Component, OnInit } from "@angular/core";
import { NewsService } from "../service/news.service";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import { DataSharingService } from "../../../public service/data-sharing.service";
import { AlertService } from '../../../public service/alert.service';
import { UpperAnimations } from '../../../animation/animation3';

@Component({
  selector: "app-view-news",
  templateUrl: "./view-news.component.html",
  styleUrls: ["./view-news.component.css"],
  animations: [UpperAnimations],
  host: {
    '[@pageAnimations]': ''
  }
})
export class ViewNewsComponent implements OnInit {
  rows: any[];
  newsData: any = {};
  loading: boolean;
  errorStatusText: string;
  public page: number = 0;
  count: number;
  noResult: string;
  keyword: any;
  constructor(
    private newsService: NewsService,
    private router: Router,
    private dataService: DataSharingService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.rows = [];
    this.getAllNews('');
  }

  /*********************************************************** Get All News *******************************************************************/

  getAllNews(keyword) {
    this.keyword = keyword;

    this.loading = true;
    let pageCounter = 0;
    if (this.page != 0) {
      let changedPage = this.page - 1;
      let pages = changedPage;
      pageCounter = Number(pages);
    }

    this.newsService.getAllNews(pageCounter,keyword).subscribe(
      res => {
        if (res.status == true) {
          this.rows = [];
          this.rows = res.data.admin_news_data;
          this.loading = false;
          this.count = res.data.total_results;
          this.noResult = null;
          window.scroll(0,0);

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

  /*********************************************************** View Selected News *******************************************************************/


  viewNews(row):void{
    this.newsData = row;
  }

    /*********************************************************** Page Change *******************************************************************/

    pageChange(pageNo: any): void {
      this.loading = true;
      this.page = pageNo;
      this.getAllNews(this.keyword);
    }
  
      /*********************************************************** Search News *******************************************************************/
  
      searchNews(keyword) {
          this.loading = true;
          let pageCounter = 0;
          if (this.page != 0) {
            let changedPage = this.page - 1;
            let pages = changedPage;
            pageCounter = Number(pages);
          }
          this.getAllNews(keyword);
      }


  /*********************************************************** Delete Selected News *******************************************************************/

  deleteNews(news_id: number) {
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
        this.newsService.deleteNews(news_id).subscribe(res => {
          this.alertService.showNotification('bottom', 'right', res.message);
          this.getAllNews('');
        }, error => {
          this.alertService.actionAlert(error.error.message, 'News Not Deleted', 'danger');
        });
      }
    });
  }

  /*********************************************************** Add  News *******************************************************************/


  addNews() {
    let selectedNews = null;
    this.dataService.changeData(selectedNews);
    this.router.navigate(["/manage-news/add-new"]);
  }

  /* Fire this function when edit selected News */

  editNews(selectedNews) {
    this.dataService.changeData(selectedNews);
    this.router.navigate(["/manage-news/add-new"]);
  }
}
