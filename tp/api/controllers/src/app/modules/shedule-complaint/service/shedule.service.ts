import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from '../../../public service/configuration.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
 /*********************************************************** CRUD Operation Start ***********************************************************/

//  public baseUrl = ConfigurationService.baseUrl + 'AdminSchedule';
 constructor(private httpClient: HttpClient) {}

 /*********************************************************** Get All Schedule *******************************************************************/
 getAllSchedule(pageNo): Observable<any> {
   return this.httpClient.get<any>( ConfigurationService.baseUrl + `AdminScheduleComplaints/view//${pageNo}`);
 }

 /*********************************************************** Add New Schedule *******************************************************************/

 addSchedule(sheduleData: any): Observable<any> {
   return this.httpClient.post<any>( ConfigurationService.baseUrl + `AdminScheduleComplaints/add`, sheduleData);
 }


 /*********************************************************** Delete Selected Schedule *******************************************************************/

 deleteSchedule(shedule_id: number): Observable<any> {
   return this.httpClient.delete<any>(
      ConfigurationService.baseUrl + `AdminScheduleComplaints/delete/` + shedule_id
   );
 }

 /*********************************************************** Edit Selected Schedule *******************************************************************/

 editSchedule(shedule_id: number, editedScheduleData: any): Observable<any> {
   return this.httpClient.put<any>(
      ConfigurationService.baseUrl + `AdminScheduleComplaints/update/` + shedule_id,
     editedScheduleData
   );
 }

  /*********************************************************** Get All Client *******************************************************************/
  getClientList(): Observable<any> {
    return this.httpClient.get<any>(ConfigurationService.baseUrl + `GetClient/view`);
  }


  /*********************************************************** Get Site By ClientId ************************************************************/

   getSiteByClient(client_id): Observable<any> {
     
    return this.httpClient.get<any>(ConfigurationService.baseUrl + `GetSiteByClientId/view/${client_id}`);
  }


   /*********************************************************** Get Employee List ************************************************************/

   getEmployeeList(): Observable<any> {
    return this.httpClient.get<any>(ConfigurationService.baseUrl + `GetEmployee/view`);
  }

   /*********************************************************** Get Complaint Type ************************************************************/

   getComplaintTypeList(): Observable<any> {
    return this.httpClient.get<any>(ConfigurationService.baseUrl + `GetComplaintType/view`);
  }

 /*********************************************************** CRUD Operation End ***********************************************************/
}