import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../features/Services/authService/auth.service';

export function RefreshTokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const authService = inject(AuthService)
    let isRefreshing = false;
  
    const cloned = req.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      },
      withCredentials: true 
    });
    return next(cloned).pipe(
      catchError(error => {
        if (error.status === 401 && !isRefreshing) {
          isRefreshing = true;
  
          return authService.refreshToken().pipe(
            switchMap((res: any) => {
              isRefreshing = false;
              return next(cloned);
            }),
            catchError(err => {
              isRefreshing = false;
              // authService.logout();
              return throwError(() => err);
            })
          );
        }
        return throwError(() => error);
      })
    );
}