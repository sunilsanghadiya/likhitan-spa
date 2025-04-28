import { Component, OnInit } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { DynamicFormComponent } from '../../core/componenets/dynamic-form/dynamic-form.component';
import { AuthService } from '../Services/authService/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormField } from '../../core/interfaces/DynamicFields';
import { ForgotPassword } from '../Common/interfaces/ForgotPasswordDto';
import { ForgotPasswordResponse } from '../Common/Models/ForgotPasswordResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [
    NzCardComponent,
    DynamicFormComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;
  formFields: any;
  constructor(public _authService: AuthService, public _fb: FormBuilder, public _router: Router) { }

  ngOnInit() {
    this.createForgotPassword()
    this.prepareForm();
  }

  prepareForm() {
    let formFieldsData: FormField<ForgotPassword>[] = [
      {
        type: 'input',
        name: 'email',
        label: 'Email',
        placeholder: 'email',
        hidden: false,
        validations: {
          required: true,
          email: true,
          minLength: 5,
          maxLength: 512,
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$',
          isServerSideCheck: true,
          isFieldValid: true
        },
        errorMessages: [ 
          { require: 'Email is required' },
          { minLength: 'Min 5 character' },
          { maxLength: 'Max 512 character' },
          { emailExists: 'Email does not exists' },
          { pattern: 'Invalid email' }
         ]
      },
      {
        type: 'input',
        name: 'newPassword',
        label: 'Password',
        placeholder: 'password',
        tooltip: 'First fill email',
        hidden: false,
        validations: {
          required: true,
          minLength: 8,
          password: true,
          maxLength: 512,
          pattern: `^(?!<username>).*?(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>\\/?]).{8,}$`,
        },
        errorMessages: [ 
          { required: 'Password is required' },
          { minLength: 'Min 8 character' },
          { maxLength: 'Max 512 character' },
          { password: 'Invalid password' },
          { pattern: "One uppercase and one lowercase and one number and one special character" },
          { emailExists: 'Email already exists' }
         ]
      },
      {
        type: 'input',
        name: 'confirmNewPassword',
        label: 'Confirm new password',
        placeholder: 'confirm new password',
        tooltip: 'First fill email',
        hidden: false,
        validations: {
          required: true,
          minLength: 8,
          password: true,
          maxLength: 512,
          parentControl: { "controlName": "password" }
        },
        errorMessages: [ 
          { required: 'Password is required' },
          { minLength: 'Min 8 character' },
          { maxLength: 'Max 512 character' },
          { password: 'Invalid password' },
          { parentControl: 'Password and confirm password should be match' }
         ]
      }
    ]
    this.formFields = formFieldsData  
  }
  

  createForgotPassword() {
    return this.forgotPasswordForm = this._fb.group({
      email: [],
      newPassword: [],
      confirmNewPassword: []
    })
  }

  onForgotPassword(event: any) {
    if (event) {
      let payload = {
        email: event.controls["email"]?.value,
        password: event.controls["newPassword"]?.value,
        confirmPassword: event.controls["newConfirmPassword"]?.value
      }

      this._authService.forgotPassWord(payload).subscribe({
        next: (response: ForgotPasswordResponse) => {
          if(response.data.accessToken) {
            this._router.navigate(['/login']);
          }
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    }
  }

}
