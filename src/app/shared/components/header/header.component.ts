import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutOutline, SettingOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { MenuService, NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Subject } from 'rxjs';
import { HelperService } from '../../../core/Helper/HelperService';
import { StatesService } from '../../../core/Helper/states.service';
import { ModelService } from '../../../core/services/modelService/model.service';
import { NotificationService } from '../../../core/services/nzNotification/nz-notification.service';
import { BecomeAuthorComponent } from '../../../features/author/become-author/become-author.component';
import { BecomeAuthorDto } from '../../../features/Common/interfaces/BecomeAuthorDto';
import { BecomeAuthorResponse } from '../../../features/Common/Models/BecomeAuthorResponse';
import { LogoutResponse } from '../../../features/Common/Models/LogoutResponse';
import { AuthorApiService } from '../../../features/Services/authorApiService/author-api.service';
import { AuthService } from '../../../features/Services/authService/auth.service';
import { UserRoles } from '../../../core/enums/UserRoles';
import { UserAvatarComponent } from "../../../core/componenets/user-avatar/user-avatar.component";

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
    NzTypographyModule,
    UserAvatarComponent
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

  @Input() isShowSearchBar: boolean = true;
  @Input() isShowTitle: boolean = true;
  @Input() isShowBecomeAuthor: boolean = true;
  @Input() isShowWrite: boolean = false;

  searchIcon = '';
  userAvatarUrl: string = '';
  public modalDataSubject = new Subject<any>();
  loggedInUserDetail?: any;

  constructor(private iconService: NzIconService, public _router: Router, public _modelService: ModelService,
    public _authService: AuthService, private _authorApiService: AuthorApiService,
    public _notificationService: NotificationService, private _helperService: HelperService, private _statesService: StatesService) {
    this.iconService.addIcon(UserOutline, SettingOutline, LogoutOutline);
  }

  ngOnInit() {
    this.checkAuthorId();
  }

  onProfileClick() {

  }

  onSettingsClick() {

  }

  onLogoutClick() {
    this._authService.logout().subscribe({
      next: (response: LogoutResponse) => {
        if (response.data.isLogout) {
          this._router.navigate(['/login']);
        }
      },
      error: (error: any) => {
        console.log(error);
        this._notificationService.failedNotification("Failed", "Please try again latter", "topRight");
      },
      complete: () => { }
    })
    localStorage.clear();
  }

  onSearchClick() {
    const modelRef = this._modelService.openCustomModal({
      title: '',
      content: 'Search something..',
      width: '600px',
      footer: null,
      nzClosable: true,
      nzDraggable: true,
      nzCentered: true,
      nzKeyboard: true, 
      onCancel: () => {
        return new EventEmitter<void>();
      },
    })
    const modelComponent = modelRef.getContentComponent();
    modelComponent.formSubmit.subscribe((data: any) => {
      if (data) {

      }
    })
  }

  onBecomeAuthor() {
    const modelRef = this._modelService.openCustomModal({
      title: 'Become author',
      content: BecomeAuthorComponent,
      width: '700px',
      nzOkText: 'Submit',
      nzCancelText: 'Close',
      nzClosable: true,
      footer: null,
      onOk: () => {
        const component = modelRef.getContentComponent();
        return component.submitForm();
      },
      onCancel: () => {
        return new EventEmitter<void>();
      },
    })
    const modalComponent = modelRef.getContentComponent();
    modalComponent.formSubmit.subscribe((data: any) => {
      let payload: BecomeAuthorDto = {
        gender: data.controls["gender"]?.value,
        dob: data.controls["dob"]?.value
      }
      this._authorApiService.saveBecomeAuthor(payload).subscribe({
        next: (response: BecomeAuthorResponse) => {
          if (response.isSuccess) {
            response.authorId ? this.isShowWrite = true : this.isShowWrite = false;
            this._helperService.prepareEncryptData({ authorId: response.authorId });
            this._statesService.setData(response.authorId);
            this._notificationService.successNotification("Author added", "Congratulations you are become author", "topRight");
          }
        },
        error: (error: any) => {
          console.log(error);
          this._notificationService.failedNotification("Failed", "Please try again latter", "topRight");
        }
      });
      modelRef.close();
    });
  }

  onWriteBlog() {
    this._router.navigate(['/new-blog'])
  }

  async checkAuthorId() {
    this._statesService.data$.subscribe((data: any) => {
      if (data?.authorId) {
        this.isShowWrite = true;
      }
    })
    let storedData = await this._helperService.prepareDecryptData();
    if(storedData?.name) {
      this.loggedInUserDetail = storedData;
    }
  }

}
