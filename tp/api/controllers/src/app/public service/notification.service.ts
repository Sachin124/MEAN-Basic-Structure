import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMapTo';
import 'rxjs/add/observable/timer';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseUrl = ConfigurationService.baseUrl;
  handleError: any;
  constructor(private httpClient: HttpClient) { }

  getCount(): Observable<any> {
    return Observable.interval(15000).startWith(1)
      .mergeMapTo(this.httpClient.get(this.baseUrl + `Notification/view`))
      .catch(this.handleError);
  }

  notificationRead(ctid: number, cnt: any): Observable<any> {
    return this.httpClient.put<any>(this.baseUrl + `Notification/readornot/` + ctid, cnt);
  }

  getDashboardDetails(date): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + `AdminDashboard/getstatus/`+ date);
  }

  getGraphsData(year):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + `graph/view/` + year);
  }


}
