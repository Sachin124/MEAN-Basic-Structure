import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import {
    Observable
} from 'rxjs';
import {
    Injectable
} from '@angular/core';
import {
    Router,
} from '@angular/router';
import {
    tap
} from 'rxjs/operators';
import { AlertService } from '../public service/alert.service';
import { AuthenticationService } from '../public service/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private authenticationService: AuthenticationService, private alertService: AlertService) { }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('currentUser');
        if (token != "undefined" && token !== null) {
            request = request.clone({
                setHeaders: {
                    Authorization: JSON.parse(localStorage.getItem('currentUser')).data.admin_login_credentials.token
                }
            });
        }

        return next.handle(request).pipe(tap((

        ) => { },
            err => {
                if (err.status === 401) {
                    this.authenticationService.logout();
                    this.router.navigateByUrl('/login');
                    this.alertService.showAlert('Session Expired',
                        'error');
                }
            }
        ));
    }
}
