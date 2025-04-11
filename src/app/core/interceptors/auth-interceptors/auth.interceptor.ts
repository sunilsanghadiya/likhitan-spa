import { inject } from '@angular/core';
import { HttpRequest, HttpEvent, HttpErrorResponse, HttpHandlerFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';


export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const cookieService = inject(CookieService);

  const token = cookieService.get('AccessToken');

  let headers = req.headers.set('Content-Type', 'application/json');
  headers = req.headers.set('Accept', 'text/plain');
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }
  const authReq = req.clone({ headers });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error:', error);
      return throwError(() => error);
    }),
    finalize(() => {
    })
  );
}