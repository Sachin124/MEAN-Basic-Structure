import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = `http://localhost:3000/api/`;
  constructor(private httpClient: HttpClient) {}


  getData(): Observable < any > {
    return this.httpClient.get < any > (`${this.baseUrl}posts`);
  }

  saveData(model): Observable < any > {
    return this.httpClient.post < any > (`${this.baseUrl}saveAngular`, model);
  }

  getEmployee(): Observable < any > {
    return this.httpClient.get < any > (`${this.baseUrl}getEmployee`)
  }

  addEmployee(employee):Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl}addEmployee`, employee)
  }
}