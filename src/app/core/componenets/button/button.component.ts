import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-button',
  imports: [
    NzButtonModule,
    NzSpinModule,
    NzAlertModule
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent implements OnInit, OnDestroy {

  @Input() buttonText: string = DefaultDataTypeValues.STRING;
  @Input() nzType: any | undefined;
  @Input() disabled: boolean = false;
  @Input() nzGhost:  boolean = false;
  @Input() nzLoading:  boolean = false;
  @Input() nzShape: any;
  @Input() nzSize: any;
  @Input() nzBlock: boolean = false;
  @Input() nzDanger: boolean = false;
  @Input() nzTip: any;

  
  constructor() { }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
