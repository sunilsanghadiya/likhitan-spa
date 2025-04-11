import { Component, computed, inject, Signal } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NetworkStatusService } from '../../services/networkStatusServoce/network-status.service';

@Component({
  selector: 'app-network-status',
  imports: [],
  templateUrl: './network-status.component.html',
  styleUrl: './network-status.component.css'
})
export class NetworkStatusComponent  {

  // private readonly networkService = inject(NetworkStatusService);
  // readonly isOnline: Signal<boolean> = computed(() => this.networkService.onlineStatus());

}
