import { Injectable } from '@angular/core';
import { ConfigurationService } from '../../../public service/configuration.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
 /*********************************************************** CRUD Operation Start ***********************************************************/

 public baseUrl = ConfigurationService.baseUrl + 'AdminClient';
 constructor(private httpClient: HttpClient) {}

 /*********************************************************** Get All Client *******************************************************************/
 getAllClient(pageNo,searchKeyword): Observable<any> {
   return this.httpClient.get<any>(this.baseUrl + `/view/${pageNo}/?keyword=${searchKeyword}`).pipe(
    debounceTime(5000));;
 }

 /*********************************************************** Add New Client *******************************************************************/

 addClient(clientData: any): Observable<any> {
   return this.httpClient.post<any>(this.baseUrl + `/add`, clientData);
 }

 /*********************************************************** Add Client Photo *****************************************************************/

 photoUpload(photoData: any): Observable<any> {
   return this.httpClient.post<any>(
     this.baseUrl + `/clientimageupload`,
     photoData
   );
 }

 /*********************************************************** Delete Selected Client *******************************************************************/

 deleteClient(client_id: number): Observable<any> {
   return this.httpClient.delete<any>(
     this.baseUrl + `/delete/` + client_id
   );
 }

 /*********************************************************** Edit Selected Client *******************************************************************/

 editClient(client_id: number, editedClientData: any): Observable<any> {
   return this.httpClient.put<any>(
     this.baseUrl + `/update/` + client_id,
     editedClientData
   );
 }

 /*********************************************************** CRUD Operation End ***********************************************************/
}