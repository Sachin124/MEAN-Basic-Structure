import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Response, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import "rxjs/add/operator/map";
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { ConfigurationService } from './configuration.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loginURL = ConfigurationService.baseUrl;
  public isLoggedIn: any;
  public loginLoader: boolean = false;
  redirectUrl: string;
  constructor(private _http: Http, private router: Router, private alertService: AlertService) { }


  login(body: URLSearchParams) {
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let options = new RequestOptions({ headers: headers });
    this._http.post(this.loginURL + `AdminAuthorization/login`, body.toString(), options).subscribe(
      (response: Response) => {
        if (response) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(response.json()));
          this.isLoggedIn = response.status;
          setTimeout(() => {
            this.loginLoader = true;
            this.router.navigate(["/dashboard"])
            this.alertService.showLoginNotification('top', 'center', response.json().message);
          }, 2000);
        }
        else {
          this.isLoggedIn = response.status;
        }
      },
      error => {
        this.loginLoader = true;
        this.alertService.showAlert(error.json().message, 'error');
      });
  }

  checkAuth(value: any){
    return this._http.post(this.loginURL + `AdminAuthorization/checkauthentication`,  value); 
  }

  changePassword(value: any){
    return this._http.post(this.loginURL + `AdminAuthorization/changepassword/`,  value);
  }

  sendOTP(value: any) {
    return this._http.post(this.loginURL + `AdminAuthorization/sendotp`, value);
  }


  verifyOTP(value: any) {
    return this._http.post(this.loginURL + `AdminAuthorization/otpverify`, value);
  }
  resetPassword(value: any) {
    return this._http.post(this.loginURL + `AdminAuthorization/resetpassword`, value);
  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigate(["/login"]);
  }
}
