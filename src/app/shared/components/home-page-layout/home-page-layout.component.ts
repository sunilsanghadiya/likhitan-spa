import { Component, Input, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { UserOutline } from '@ant-design/icons-angular/icons';
import { HeaderComponent } from "../header/header.component";
import { StatesService } from '../../../core/Helper/states.service';
import { HelperService } from '../../../core/Helper/HelperService';
import { UserRoles } from '../../../core/enums/UserRoles';

@Component({
  selector: 'app-home-page-layout',
  imports: [
    NzLayoutModule,
    NzAvatarModule,
    NzInputModule,
    NzIconModule,
    HeaderComponent
],
  templateUrl: './home-page-layout.component.html',
  styleUrl: './home-page-layout.component.css'
})
export class HomePageLayoutComponent implements OnInit {

  searchIcon = '';
  @Input() isShowWrite: boolean = false;

  constructor(private iconService: NzIconService, private _helperService: HelperService) {
    this.iconService.addIcon(UserOutline);
   }

  ngOnInit() {
    this.prepareCommonData()
  }

  prepareCommonData() {
    this._helperService.prepareDecryptData().then((data: any) => {
      if(data?.authorId) {
        this.isShowWrite = true;
      }
    })
  }


}
