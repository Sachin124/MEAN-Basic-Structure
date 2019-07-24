import { Component, OnInit, ElementRef, OnDestroy } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { AuthenticationService } from "../public service/authentication.service";
import { AlertService } from "../public service/alert.service";
import { ValidationService } from "../public service/validation.service";

// import {} from '../../assets/img/'
declare var $: any;

@Component({
  selector: "app-login-cmp",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  mobilePattern = ValidationService.mobilePattern;
  hidePass = true;

  mobile_number: string = null;
  timeLeft: number = 60;
  interval;
  password: string = null;
  forgotPassword: boolean = false;
  sendOTPFlag: boolean;
  flag: number = 1;
  newPassword: boolean;
  otp: any;
  constructor(
    private element: ElementRef,
    public authService: AuthenticationService,
    private alertService: AlertService,
    public router: Router
  ) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.authService.loginLoader = true;
    this.forgotPassword = false;
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggle")[0];
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("login-page");
    body.classList.add("off-canvas-sidebar");
    const card = document.getElementsByClassName("card")[0];
    setTimeout(function() {
      // after 1000 ms we add the class animated to the login/register card
      card.classList.remove("card-hidden");
    }, 700);
  }
  sidebarToggle() {
    var toggleButton = this.toggleButton;
    var body = document.getElementsByTagName("body")[0];
    var sidebar = document.getElementsByClassName("navbar-collapse")[0];
    if (this.sidebarVisible == false) {
      setTimeout(function() {
        toggleButton.classList.add("toggled");
      }, 500);
      body.classList.add("nav-open");
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove("toggled");
      this.sidebarVisible = false;
      body.classList.remove("nav-open");
    }
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("login-page");
    body.classList.remove("off-canvas-sidebar");
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    }, 1000);
  }

  forgotPassw() {
    if (this.forgotPassword) {
      this.forgotPassword = false;
      this.sendOTPFlag = true;
    } else if (!this.forgotPassword) {
      this.forgotPassword = true;
      this.sendOTPFlag = false;
    }
  }
  verifyOTP(value) {
    value.mobile_number = this.mobile_number;
    this.otp = value.otp;
    this.authService.verifyOTP(value).subscribe(
      res => {
        this.forgotPassword = true;
        this.newPassword = true;
        this.sendOTPFlag = false;
      },
      error => {
        console.log(error);
        this.alertService.showAlert(error.json().message, "error");
      }
    );
  }

  sendOTP(value) {
    this.mobile_number = value.mobile_number;
    value.resend_otp_flag = this.flag++;

    this.authService.sendOTP(value).subscribe(
      res => {
        this.forgotPassword = true;
        this.sendOTPFlag = true;
        this.newPassword = true;
        this.startTimer();
      },
      error => {
        this.alertService.showAlert(error.json().message, "error");
      }
    );
  }

  resetAccountassword(value) {
    // value.mobile_number = this.mobile_number;
    value.otp = this.otp;
    value.mobile_number = this.mobile_number;

    this.authService.resetPassword(value).subscribe(
      res => {
        this.forgotPassword = false;
        this.sendOTPFlag = false;
        this.newPassword = false;
        this.alertService.showAlert(res.json().message, "success");
        this.startTimer();
      },
      error => {
        console.log(error);
        this.alertService.showAlert(error.json().message, "error");
      }
    );
  }

  return() {
    this.forgotPassword = false;
    this.newPassword = false;
    this.sendOTPFlag = false;
    // this.resetPassword = false;
  }

  /* Calling This function when tutor want to login in tutor dashboard panel */

  login() {
    this.authService.loginLoader = false;
    let body = new URLSearchParams();
    body.set("mobile_number", this.mobile_number);
    body.set("password", this.password);
    body.set("grant_type", "implicit");
    this.authService.login(body);
  }
}
