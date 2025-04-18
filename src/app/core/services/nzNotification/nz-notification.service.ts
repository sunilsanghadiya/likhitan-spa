import { Injectable } from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public notification: NzNotificationService, public nzConfigService: NzConfigService) { 
   
  }

  successNotification(title: string, content: string, placement: NzNotificationPlacement = 'topRight'): void {
    this.notification.success(title, content, { nzPlacement: placement, nzAnimate: true  }
    );
  }

  failedNotification(title: string, content: string, placement: NzNotificationPlacement = 'topRight'): void {
    this.notification.error(title, content, { nzPlacement: placement });
  }

  infoNotification(title: string, content: string, placement: NzNotificationPlacement = 'topRight'): void {
    this.notification.info(title, content, { nzPlacement: placement });
  }

  warningNotification(title: string, content: string, placement: NzNotificationPlacement = 'topRight'): void {
    this.notification.warning(title, content, { nzPlacement: placement });
  }

  custom(type: 'success' | 'info' | 'warning' | 'error' | 'blank', title: string, content: string, placement: NzNotificationPlacement = 'topRight'): void {
    this.notification.create(type, title, content, { nzPlacement: placement });
  }

  removeAll(): void {
    this.notification.remove();
  }
}
