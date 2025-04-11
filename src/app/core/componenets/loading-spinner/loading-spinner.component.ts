import { Component } from '@angular/core';
import { LoadingService } from '../../services/loadingService/loading.service';
import { NzSpinComponent } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-loading-spinner',
  imports: [
    NzSpinComponent
  ],
  template: `@if(loadingService.isLoading()) {
    <div class="loader-overlay">
      <nz-spin nzSimple nzSize="small"></nz-spin>
    </div>
  }`,
  styleUrl: './loading-spinner.component.css',
  standalone: true
})
export class LoadingSpinnerComponent {

  constructor(public loadingService: LoadingService) {
  }
}
