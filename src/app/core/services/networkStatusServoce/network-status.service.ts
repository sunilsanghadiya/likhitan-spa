import { Injectable, NgZone, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkStatusService {

  private readonly _online = signal(navigator.onLine);
  readonly onlineStatus = this._online.asReadonly();

  constructor(private ngZone: NgZone) {
    window.addEventListener('online', () => this.updateStatus(true));
    window.addEventListener('offline', () => this.updateStatus(false));
   }

  private updateStatus(status: boolean) {
    this.ngZone.run(() => this._online.set(status));
  }
}
