import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from '../../Helper/HelperService';


export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const _helperService = inject(HelperService);
  
  let commonHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  });

  const additionalHeaders = req.context.get(_helperService.ADDITIONAL_HEADERS);
  const mergedHeaders = _helperService.mergeHeaders(commonHeaders, additionalHeaders);
  const authReq = req.clone({ headers: mergedHeaders });
  
  return next(authReq);
 
}

