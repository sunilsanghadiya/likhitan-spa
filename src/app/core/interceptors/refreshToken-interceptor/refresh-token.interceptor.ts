import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../features/Services/authService/auth.service';
// import { AuthService } from '../services/auth.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap((newToken) => {
              const clonedReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` }
              });
              return next.handle(clonedReq);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
