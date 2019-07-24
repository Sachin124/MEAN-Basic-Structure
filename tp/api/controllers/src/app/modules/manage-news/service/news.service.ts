import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigurationService } from "../../../public service/configuration.service";
import { Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class NewsService {
  /*********************************************************** CRUD Operation Start ***********************************************************/

  public baseUrl = ConfigurationService.baseUrl + 'AdminNews';
  constructor(private httpClient: HttpClient) {}

  /*********************************************************** Get All News *******************************************************************/
  getAllNews(pageNo,searchKeyword): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + `/view/${pageNo}/?keyword=${searchKeyword}`).pipe(
      debounceTime(5000));
  }

  /*********************************************************** Add New News *******************************************************************/

  addNews(newsData: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/add`, newsData);
  }

  /*********************************************************** Add News Photo *****************************************************************/

  photoUpload(photoData: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + `/newsimageupload`,
      photoData
    );
  }

  /*********************************************************** Delete Selected News *******************************************************************/

  deleteNews(news_id: number): Observable<any> {
    return this.httpClient.delete<any>(
      this.baseUrl + `/delete/` + news_id
    );
  }

  /*********************************************************** Edit Selected News *******************************************************************/

  editNews(news_id: number, editedNewsData: any): Observable<any> {
    return this.httpClient.put<any>(
      this.baseUrl + `/update/` + news_id,
      editedNewsData
    );
  }

  /*********************************************************** CRUD Operation End ***********************************************************/
}
