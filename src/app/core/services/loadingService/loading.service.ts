import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  _isLoading = signal(false);
  
  isLoading = this._isLoading;

  show(state: boolean) {
    this.isLoading.set(state);
  }

  hide(state: boolean) {
    this.isLoading.set(state);
  }
}
