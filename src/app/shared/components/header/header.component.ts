import { Component, OnInit } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LogoutOutline, SettingOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { MenuService, NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Router } from '@angular/router';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ModelService } from '../../../core/services/modelService/model.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-header',
  imports: [
    NzFlexModule,
    NzGridModule,
    NzSpaceModule,
    NzIconModule,
    NzLayoutModule,
    NzAvatarModule,
    NzInputModule,
    NzMenuModule,
    NzDropDownModule,
    NzTypographyModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [
    MenuService,
    ModelService,
    NzModalService
  ]
})
export class HeaderComponent implements OnInit {

  searchIcon = '';
  userAvatarUrl: string = '';
  
    constructor(private iconService: NzIconService, public _router: Router, public _modelService: ModelService) {
      this.iconService.addIcon(UserOutline, SettingOutline, LogoutOutline);
     }

  ngOnInit() {
  }

  onProfileClick() {

  }

  onSettingsClick() {

  }

  onLogoutClick() {
    this._router.navigate(['/login']);
  }

  onSearchClick() {
    this._modelService.openCustomModal({
      title: 'Form Modal',
      content: 'This modal was opened via service',
      width: '600px'
    })
  }

}
