import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-custom-model',
  imports: [
    NzModalModule, 
    NzButtonModule
  ],
  templateUrl: './custom-model.component.html',
  styleUrl: './custom-model.component.css',
  providers: [
    NzModalService
  ]
})
export class CustomModelComponent {
  
  @Input() isVisible = false;
  @Input() title: string | TemplateRef<any> = '';
  @Input() width: string | number = '520px';
  @Input() footerTemplate: TemplateRef<void> | null = null;
  @Input() okText = 'OK';
  @Input() cancelText = 'Cancel';
  @Input() isShowFooter: boolean = true;
  @Input() isShowContent: boolean = true;
  
  @Output() ok = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  handleOk(): void {
    this.ok.emit();
    this.isVisible = false;
  }

  handleCancel(): void {
    this.cancel.emit();
    this.isVisible = false;
  }

  open(): void {
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
  }
}
