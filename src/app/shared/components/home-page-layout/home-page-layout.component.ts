import { Component, Input, OnInit } from '@angular/core';
import { UserOutline } from '@ant-design/icons-angular/icons';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HelperService } from '../../../core/Helper/HelperService';
import { ContentComponent } from "../content/content.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-home-page-layout',
  imports: [
    NzLayoutModule,
    NzAvatarModule,
    NzInputModule,
    NzIconModule,
    HeaderComponent,
    ContentComponent
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

  async prepareCommonData() {
    this._helperService.prepareDecryptData().then((data: any) => {
      if(data?.authorId) {
        this.isShowWrite = true;
      }
    })

    let storedData = await this._helperService.prepareDecryptData();
    if(storedData) {
      storedData ? this.isShowWrite = true : this.isShowWrite
    }
  }


}
