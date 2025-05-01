import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { EventEmitter, inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { ModelService } from '../../services/modelService/model.service';
import { ServerDownComponent } from '../../componenets/server-down/server-down.component';

export const serverDownInterceptor: HttpInterceptorFn = (req, next) => {
  const modalService = inject(ModelService);
  let isModalOpen = false;

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if ((error.status === 0 || error.status >= 500) && !(error.status == 400) && !isModalOpen) {
        isModalOpen = true;
        if(isModalOpen) {
          modalService.openCustomModal({
            title: 'Service Unavailable',
            content: ServerDownComponent,
            nzOkText: 'Retry',
            nzClosable: false,
            nzMaskClosable: false,
            onOk: () => {
              isModalOpen = false;
              window.location.reload();
              return new EventEmitter<any>();
            },
            onCancel: () => {
              isModalOpen = false;
              return new EventEmitter<any>();
            }
          });
        }
      }
      return throwError(() => error);
    })
  );
};

