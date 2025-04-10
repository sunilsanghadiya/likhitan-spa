import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService } from '../../services/loadingService/loading.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private loadingService: LoadingService, public _cookieService: CookieService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._cookieService.get('AccessToken');
    const refreshToken = this._cookieService.get('RefreshToken');

    let headers = req.headers.set('Content-Type', 'application/json');
    headers = req.headers.set('Accept','text/plain');

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const authReq = req.clone({ headers });

    this.loadingService.show();

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        this.loadingService.hide();
        return throwError(() => error);
      }),
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }

}