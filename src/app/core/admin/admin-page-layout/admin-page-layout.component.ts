import { Component } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-admin-page-layout',
  imports: [ 
    NzBreadCrumbModule, 
    NzIconModule, 
    NzMenuModule, 
    NzLayoutModule
  ],
  templateUrl: './admin-page-layout.component.html',
  styleUrl: './admin-page-layout.component.css'
})
export class AdminPageLayoutComponent {
  isCollapsed = false;

  constructor() {
    
  }

}
