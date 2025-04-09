import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        
        if (error.status === 401) {
          errorMessage = 'Unauthorized! Redirecting to login.';
          this.router.navigate(['/login']);
        } else if (error.status === 403) {
          errorMessage = 'Access Denied!';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }

        console.error('Error:', errorMessage);
        return throwError(() => errorMessage);
      })
    );
  }
}
