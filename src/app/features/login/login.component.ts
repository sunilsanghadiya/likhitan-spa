import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { Subscription } from 'rxjs';
import { DynamicFormComponent } from "../../core/componenets/dynamic-form/dynamic-form.component";
import { UserRoles } from '../../core/enums/UserRoles';
import { HelperService } from '../../core/Helper/HelperService';
import { FormField } from '../../core/interfaces/DynamicFields';
import { emailExistsValidatorFactory } from '../../core/validators/emailExistsValidatorFactory';
import { LoginResponse } from '../Common/Models/LoginDto';
import { AuthService } from '../Services/authService/auth.service';
import { LoginModel } from './interfaces/loginModel';
import { StatesService } from '../../core/Helper/states.service';
import { NotificationService } from '../../core/services/nzNotification/nz-notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzFlexModule,
    NzGridModule,
    NzLayoutModule,
    NzSpaceModule,
    NzInputModule,
    NzBadgeModule,
    NzCardModule,
    NzToolTipModule,
    NzAlertModule,
    NzSwitchModule,
    NzSkeletonModule,
    NzFormModule,
    ReactiveFormsModule,
    DynamicFormComponent,
    NzTypographyComponent,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: []
})
export class LoginComponent implements OnInit, OnDestroy {

  private readonly message = inject(NzMessageService);
  loginForm!: FormGroup;
  loginData!: LoginResponse;
  returnUrl: string = '';
  formFields: any;
  private subscription!: Subscription;

  constructor(public _fb: FormBuilder, public _authService: AuthService,
    public _router: Router, private _helperService: HelperService, private _statesService: StatesService, private _notificationService: NotificationService) { }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.createLoginForm()
    this.prepareForm();
  }

  prepareForm() {
    let formFieldsData: FormField<LoginModel>[] = [
      {
        type: 'input',
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        validations: {
          required: true,
          email: true,
          minLength: 5,
          maxLength: 512,
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$'
        },
        errorMessages: [
          { require: 'Email is required.' },
          { minLength: 'Min 5 character.' },
          { maxLength: 'Max 512 character.' },
          { emailExists: 'Email does not exists.' },
          { pattern: 'Invalid email.' }
        ]
      },
      {
        type: 'input',
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        validations: {
          required: true,
          minLength: 8,
          // password: true,
          maxLength: 512
        },
        errorMessages: [
          { require: 'Password is required.' },
          { minLength: 'Min 8 character.' },
          { maxLength: 'Max 512 character.' }
        ]
      }
    ]
    this.formFields = formFieldsData;
  }

  createLoginForm() {
    return this.loginForm = this._fb.group({
      email: ['', {
        asyncValidators: [emailExistsValidatorFactory(this._authService)],
        updateOn: 'blur'
      }],
      password: ['']
    })
  }

  onLogin(event: any) {
    if (this.loginForm.invalid) return;

    let raw: LoginModel = {
      email: event.controls['email']?.value,
      password: event.controls['password']?.value
    }

    this._authService.login(raw).subscribe({
      next: (data: LoginResponse) => {
        this.loginData = data;
        if(!this.loginData.data?.roleId) {
          this._notificationService.failedNotification("Account locked", "Due to some reason temporary you account locked");
        }

        if (this.loginData.data.roleId == UserRoles.Standard) {
          this._router.navigate(['/home']);
        }
        else if (this.loginData.data.roleId == UserRoles.Author) {
          this._helperService.prepareEncryptData(this.loginData.data?.authorId);
          this._statesService.setData({ authorId: this.loginData.data.authorId });
          this._router.navigate(['/home']);
        }
        else if (this.loginData.data.roleId == UserRoles.Admin) {
          this._router.navigate(['/dashboard']);
        }
        this._helperService.prepareEncryptData(this.loginData.data?.roleId);
        this._statesService.setData({ roleId: this.loginData.data.roleId });
      },
      error: (error: any) => {
        this._notificationService.failedNotification("Internal server error", error)
        console.log(error);
      }
    })
  }
}
