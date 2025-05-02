import { Component, EventEmitter, Injectable, TemplateRef, Type } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';


@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(public modal: NzModalService) {}

  openCustomModal(options: {
    title: string | TemplateRef<string>;
    content: string | TemplateRef<any> | Type<any>;
    componentParams?: Record<string, any>
    width?: string;
    footer?: TemplateRef<any> | null;
    onAfterOpen?: () => EventEmitter<any>;
    onAfterClose?: () => EventEmitter<any>;
    nzCancelText?: string;
    nzCentered?: boolean;
    nzClosable?: boolean;
    nzOkLoading?: boolean;
    nzCancelLoading?: boolean;
    nzOkDisabled?: boolean;
    nzCancelDisabled?: boolean;
    nzDraggable?: boolean;
    nzFooter?: boolean;
    nzKeyboard?: boolean;
    nzMask?: boolean;
    nzMaskClosable?: boolean;
    nzCloseOnNavigation?: boolean;
    nzDirection?: any;
    nzMaskStyle?: {};
    nzOkText?: string;
    nzBodyStyle?: {};
    nzOkType?: string;
    nzOkDanger?: boolean;
    nzStyle?: {};
    nzCloseIcon?: string | TemplateRef<void>;
    nzVisible?: boolean;
    nzWidth?: number | string;
    nzClassName?: string;
    nzWrapClassName?: string;
    nzZIndex?: number;
    nzContent?: string | TemplateRef<any> | Component;
    nzData?: {} | any;
    nzIconType?: string;
    nzAutofocus?: string;
    onOk?: (instance: any) => any;
    onCancel?: () => EventEmitter<any>;
  }) {
  return this.modal.create({
      nzTitle: options.title,
      nzContent: options.content,
      nzWidth: options.width || '520px',
      nzFooter: options.footer === null ? null : options.footer,
      nzOnOk: options.onOk,
      nzOnCancel: options.onCancel,
      nzMaskClosable: false,
      nzClassName: options.nzClassName,
      nzBodyStyle: options.nzBodyStyle,
      nzData: options.nzData,
      nzCancelLoading: options.nzCancelLoading,
      nzOkLoading: options.nzOkLoading,
      nzCancelDisabled: options.nzCancelDisabled,
      nzDirection: options.nzDirection || 'ltr' || 'rtl',
      nzCentered: options.nzCentered,
      nzCloseIcon: options.nzCloseIcon,
      nzDraggable: options.nzDraggable,
      nzCloseOnNavigation: options.nzCloseOnNavigation,
      nzOkDanger: options.nzOkDanger,
      nzOkDisabled: options.nzOkDisabled,
      nzClosable: options.nzClosable,
      nzCancelText: options.nzCancelText,
      nzStyle: options.nzStyle,
      nzMask: options.nzMask,
      nzKeyboard: options.nzKeyboard,
      nzIconType: options.nzIconType,
      nzOkText: options.nzOkText,
      nzZIndex: options.nzZIndex,
      nzWrapClassName: options.nzWrapClassName
    });
  }

  openConfirmModal(options: {
    title: string;
    content: string;
    okText?: string;
    cancelText?: string;
    onOk?: () => void;
    onCancel?: () => void;
  }) {
    this.modal.confirm({
      nzTitle: options.title,
      nzContent: options.content,
      nzOkText: options.okText || 'OK',
      nzCancelText: options.cancelText || 'Cancel',
      nzOnOk: options.onOk,
      nzOnCancel: options.onCancel
    });
  }
}
