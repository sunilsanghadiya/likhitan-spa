import { CookieOptions, SameSite } from './../../../../node_modules/ngx-cookie-service/lib/cookie.service.d';
import { LoginModel } from './interfaces/loginModel';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { DynamicFormComponent } from "../../core/componenets/dynamic-form/dynamic-form.component";
import { FormField } from '../../core/interfaces/DynamicFields';
import { AuthService } from '../Services/authService/auth.service';
import { emailExistsValidatorFactory } from '../../core/validators/emailExistsValidatorFactory';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { Router, RouterModule } from '@angular/router';
import { LoginResponse } from '../Common/Models/LoginDto';
import { CookieService } from 'ngx-cookie-service';

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
  providers: [
    CookieService
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  private readonly message = inject(NzMessageService);
  loginForm!: FormGroup;
  loginData!: LoginResponse;

  constructor(public _fb: FormBuilder, public _authService: AuthService, public _router: Router, private _cookieService: CookieService) { }

  ngOnDestroy() {
  }

  ngOnInit() {
    this.createLoginForm()
  }

  formFields: FormField<LoginModel>[] = [
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
        { require: 'Email is required' },
        { minLength: 'Min 5 character' },
        { maxLength: 'Max 512 character' },
        { email: 'Email does not exists' },
        { pattern: 'Invalid email' }
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
        { require: 'Password is required' },
        { minLength: 'Min 8 character' },
        { maxLength: 'Max 512 character' },
        // { password: 'Invalid password' }
      ]
    }
  ]

  createLoginForm() {
    return this.loginForm = this._fb.group({
      email: ['', {
        asyncValidators: [emailExistsValidatorFactory(this._authService)],
        updateOn: 'blur'
      }
      ],
      password: ['']
    })
  }

  onLogin(event: any) {
    if (this.loginForm.invalid) return;

    let raw = {
      email: event.controls['email']?.value,
      password: event.controls['password']?.value
    }

    this._authService.login(raw).subscribe({
      next: (data: LoginResponse) => {
        this.loginData = data;
        this._cookieService.set("AccessToken", this.loginData.data.accessToken);
        this._cookieService.set("RefreshToken", this.loginData.data.refreshToken);
        
        if (this.loginData.data.accessToken) {
          this._router.navigate(['/home'])
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  forgotPassword() {

  }

  register() {

  }

  IsEmailExist() {

  }
}
