import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { LoadingService } from '../../services/loadingService/loading.service';

@Component({
  selector: 'app-loading-spinner',
  imports: [
    NzSpinComponent,
    AsyncPipe
  ],
  template: `@if(loadingService.loading$ | async) {
    <nz-spin [nzSpinning]="true" nzTip="Loading..." class="fullscreen-spinner"></nz-spin>
  }`,
  styleUrl: './loading-spinner.component.css',
  standalone: true
})
export class LoadingSpinnerComponent {

  constructor(public loadingService: LoadingService) { }
}
