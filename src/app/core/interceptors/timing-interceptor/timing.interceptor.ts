import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export function TimingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const startTime = Date.now();

  return next(req).pipe(
    finalize(() => {
      const elapsedTime = Date.now() - startTime;
      console.log(`${req.url} took ${elapsedTime}ms`);
    })
  );
}
