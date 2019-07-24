import { Injectable } from '@angular/core';
import { ConfigurationService } from '../../../public service/configuration.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
 /*********************************************************** CRUD Operation Start ***********************************************************/

 public baseUrl = ConfigurationService.baseUrl + 'AdminComplaintType';
 constructor(private httpClient: HttpClient) {}

 /*********************************************************** Get All Complaints *******************************************************************/
 getComplaints(status_type_id: number,pageNo): Observable<any> {
  return this.httpClient.get<any>(ConfigurationService.baseUrl + `AdminDashboard/getcomplaintbystatus/${status_type_id}/${pageNo}` ).pipe(
    debounceTime(5000));
}

/*********************************************************** Get All Complaints *******************************************************************/
getComplaintDetailsById(complaint_id: number): Observable<any> {
  return this.httpClient.get<any>(ConfigurationService.baseUrl + `/AdminComplaints/viewparticular/${complaint_id}` );
}

 /*********************************************************** Get All Complaints *******************************************************************/
 getAllComplaints(): Observable<any> {
   return this.httpClient.get<any>(this.baseUrl + `/view`);
 }

 
 /*********************************************************** Get All Complaints *******************************************************************/
 getAllEmployees(): Observable<any> {
  return this.httpClient.get<any>(ConfigurationService.baseUrl + `AdminEmployee/employeelist`);
}


 /*********************************************************** Add New Complaint *******************************************************************/

 addComplaint(faqData: any): Observable<any> {
   return this.httpClient.post<any>(this.baseUrl + `/add`, faqData);
 }


 /*********************************************************** Delete Selected Complaint *******************************************************************/

 deleteComplaint(complaint_type_id: number): Observable<any> {
   return this.httpClient.delete<any>(
     this.baseUrl + `/delete/` + complaint_type_id
   );
 }

 /*********************************************************** Edit Selected Complaint *******************************************************************/

 editComplaint(complaint_type_id: number, editedComplaintData: any): Observable<any> {
   return this.httpClient.put<any>(
     this.baseUrl + `/update/` + complaint_type_id,
     editedComplaintData
   );
 }


  /*********************************************************** Assgin Task To Employee *******************************************************************/

  assignTask(assignTaskData: any): Observable<any> {
    return this.httpClient.put<any>(ConfigurationService.baseUrl + `AdminAssignEmployee/update`, assignTaskData);
  }

 /*********************************************************** CRUD Operation End ***********************************************************/
}
