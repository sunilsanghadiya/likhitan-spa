import { Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { UserOutline } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-home-page-layout',
  imports: [
    NzLayoutModule, 
    NzAvatarModule, 
    NzInputModule,
    NzIconModule
  ],
  templateUrl: './home-page-layout.component.html',
  styleUrl: './home-page-layout.component.css'
})
export class HomePageLayoutComponent implements OnInit {

  searchIcon = '';

  constructor(private iconService: NzIconService) {
    this.iconService.addIcon(UserOutline);
   }

  ngOnInit() {

  }

}
