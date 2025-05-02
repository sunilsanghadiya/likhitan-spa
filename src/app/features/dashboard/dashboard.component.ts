import { Component, OnInit } from '@angular/core';
import { AdminPageLayoutComponent } from '../../core/admin/admin-page-layout/admin-page-layout.component';
import { HelperService } from '../../core/Helper/HelperService';
import { UserRoles } from '../../core/enums/UserRoles';

@Component({
  selector: 'app-dashboard',
  imports: [
    AdminPageLayoutComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
