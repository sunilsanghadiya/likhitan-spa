import { Component } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import { DashboardOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NZ_ICONS, NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HeaderComponent } from "../../../shared/components/header/header.component";

const Icons: IconDefinition[] = [
  UserOutline, 
  DashboardOutline
]
@Component({
  selector: 'app-admin-page-layout',
  imports: [
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    HeaderComponent
],
  templateUrl: './admin-page-layout.component.html',
  styleUrl: './admin-page-layout.component.css',
  providers: [
    { provide: NZ_ICONS, useValue: Icons } 
  ]
})
export class AdminPageLayoutComponent {
  isCollapsed = false;
  

  constructor(public iconService: NzIconService) {
    this.iconService.addIcon(...Icons);

  }

}
