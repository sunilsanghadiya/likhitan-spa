import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DynamicFormComponent } from '../../core/componenets/dynamic-form/dynamic-form.component';
import { Router, RouterModule } from '@angular/router';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../Services/authService/auth.service';
import { FormField } from '../../core/interfaces/DynamicFields';
import { RegisterModel } from '../login/interfaces/registerMode';
import { emailExistsValidatorFactory } from '../../core/validators/emailExistsValidatorFactory';
import { RegisterResponse } from '../Common/Models/RegisterResponse';
import { DataStoreService } from '../../core/services/dataStoreService/data-store.service';
import { isEmailDomainSupportValidator } from '../../core/validators/isEmailDomainSupportValidator';

@Component({
  selector: 'app-register',
  imports: [
    DynamicFormComponent,
    RouterModule,
    NzCardComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup;
  registerUserResponse: any;

  constructor(public _fb: FormBuilder, public _authService: AuthService, public _route: Router,
    public _dataStoreService: DataStoreService<any>
  ) { }

  ngOnDestroy() {

  }

  ngOnInit() {
    this.createRegisterForm()
    this.prepareForm();
  }

  prepareForm() {
    let formFields: FormField<RegisterModel>[] = [
      {
        type: 'input',
        name: 'firstName',
        label: 'Firstname',
        placeholder: 'Firstname',
        hidden: false,
        validations: {
          required: true,
          minLength: 2,
          maxLength: 512
        },
        errorMessages: [ 
          { required: 'First name is required' },
          { minLength: 'Min 2 character' },
          { maxLength: 'Max 512 character' }
         ]
      },
      {
        type: 'input',
        name: 'lastName',
        label: 'Lastname',
        placeholder: 'Lastname',
        hidden: false,
        validations: {
          required: true,
          minLength: 2,
          maxLength: 512
        },
        errorMessages: [ 
          { required: 'Last name is required' },
          { minLength: 'Min 2 character' },
          { maxLength: 'Max 512 character' }
         ]
      },
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
          isFieldValid: false,
          customValidators: [isEmailDomainSupportValidator(this._authService)]
        },
        errorMessages: [ 
          { require: 'Email is required' },
          { minLength: 'Min 5 character' },
          { maxLength: 'Max 512 character' },
          { emailExists: 'Email already exists' },
          { pattern: 'Invalid email' },
          { emailDomain: 'Provided email domain not support' }
         ]
      },
      {
        type: 'input',
        name: 'password',
        label: 'Password',
        placeholder: 'password',
        hidden: false,
        validations: {
          required: true,
          minLength: 8,
          password: true,
          maxLength: 512,
          pattern: `^(?!<username>).*?(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>\\/?]).{8,}$`
        },
        errorMessages: [ 
          { required: 'Password is required' },
          { minLength: 'Min 8 character' },
          { maxLength: 'Max 512 character' },
          { password: 'Invalid password' },
          { pattern: "One uppercase and one lowercase and one number and one special character" }
         ]
      },
      {
        type: 'input',
        name: 'confirmPassword',
        label: 'Confirm password',
        placeholder: 'confirm password',
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
      },
      {
        type: 'checkbox',
        name: 'isTeamsAndConditionAccepted',
        label: 'Teams and conditions',
        hidden: true,
        validations: {
          required: true
        },
        errorMessages: [ 
          { require: 'Please accept teams and conditions' },
         ]
      }
    ]
  }

  createRegisterForm() {
    return this.registerForm = this._fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', { 
        asyncValidators: [
          emailExistsValidatorFactory(this._authService),
          isEmailDomainSupportValidator(this._authService),
        ], updateOn: 'blur' }],
      password: [''],
      confirmPassword: [''],
      isTeamsAndConditionAccepted: [false]
    })
  }

  onRegister(event: any) {
    if(event.invalid || this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value) return;
    let raw = {
      id: 0,
      firstname: event.controls['firstName']?.value,
      lastname: event.controls['lastName']?.value,
      email: event.controls["email"]?.value,
      password: event.controls['password']?.value,
      confirmPassword: event.controls['confirmPassword']?.value,
      isTeamsAndConditionAccepted: event.controls['isTeamsAndConditionAccepted'].value
    }

    this._authService.register(raw).subscribe({
      next: (data: RegisterResponse) => {
        this.registerUserResponse = data;
        this._dataStoreService.initialize();
        this._dataStoreService.setData(this.registerUserResponse);
        this._route.navigate(['/sendotp']);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
