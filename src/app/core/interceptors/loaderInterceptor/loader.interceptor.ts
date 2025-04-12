import { HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../services/loadingService/loading.service';
import { Observable, tap } from 'rxjs';

export function LoggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const loader = inject(LoadingService);
  loader.show(true);

  return next(req).pipe(tap((event: any) => {
    if (event.type === HttpEventType.Response) {
      loader.hide(false);
    }
  }));
}