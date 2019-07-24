import { Injectable } from '@angular/core';
import { ConfigurationService } from '../../../public service/configuration.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 /*********************************************************** CRUD Operation Start ***********************************************************/

 public baseUrl = ConfigurationService.baseUrl + 'AdminEmployee';
 constructor(private httpClient: HttpClient) {}

 /*********************************************************** Get All Employee *******************************************************************/
 getAllEmployee(pageNo,searchKeyword): Observable<any> {
   return this.httpClient.get<any>(this.baseUrl + `/view/${pageNo}/?keyword=${searchKeyword}`).pipe(
    debounceTime(5000));
 }

 /*********************************************************** Add New Employee *******************************************************************/

 addEmployee(faqData: any): Observable<any> {
   return this.httpClient.post<any>(this.baseUrl + `/add`, faqData);
 }

 /*********************************************************** Add Employee Photo *****************************************************************/

 photoUpload(photoData: any): Observable<any> {
   return this.httpClient.post<any>(
     this.baseUrl + `/employeeimageupload`,
     photoData
   );
 }

 /*********************************************************** Delete Selected Employee *******************************************************************/

 deleteEmployee(employee_id: number): Observable<any> {
   return this.httpClient.delete<any>(
     this.baseUrl + `/delete/` + employee_id
   );
 }

 /*********************************************************** Edit Selected Employee *******************************************************************/

 editEmployee(employee_id: number, editedEmployeeData: any): Observable<any> {
   return this.httpClient.put<any>(
     this.baseUrl + `/update/` + employee_id,
     editedEmployeeData
   );
 }

 /*********************************************************** CRUD Operation End ***********************************************************/
}
