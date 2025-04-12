import { inject } from '@angular/core';
import { HttpRequest, HttpEvent, HttpErrorResponse, HttpHandlerFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loadingService/loading.service';

export function ErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  const loader = inject(LoadingService)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      loader.hide(false);
      let errorMessage = 'An unknown error occurred!';

      if (error.status === 401) {
        errorMessage = 'Unauthorized! Redirecting to login.';
        router.navigate(['/login']);
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
