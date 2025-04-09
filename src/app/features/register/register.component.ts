import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DynamicFormComponent } from '../../core/componenets/dynamic-form/dynamic-form.component';
import { RouterModule } from '@angular/router';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../Services/authService/auth.service';
import { FormField } from '../../core/interfaces/DynamicFields';
import { RegisterModel } from '../login/interfaces/registerMode';
import { emailExistsValidatorFactory } from '../../core/validators/emailExistsValidatorFactory';
import { confirmPasswordValidator } from '../../core/validators/PasswordValidator';

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

  private readonly message = inject(NzMessageService);
  registerForm!: FormGroup;

  constructor(public _fb: FormBuilder, public _authService: AuthService) { }


  get f() {
    return this.registerForm.controls
  }

  ngOnDestroy() {

  }

  ngOnInit() {
    this.createRegisterForm()
  }

  formFields: FormField<RegisterModel>[] = [
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
      placeholder: 'password',
      hidden: false,
      validations: {
        required: true,
        minLength: 8,
        password: true,
        maxLength: 512
      },
      errorMessages: [ 
        { require: 'Password is required' },
        { minLength: 'Min 8 character' },
        { maxLength: 'Max 512 character' },
        { email: 'Invalid password' }
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
        customValidator: confirmPasswordValidator(this.registerForm?.controls?.['password']?.value, this.registerForm?.controls?.['confirmPassword']?.value)
      },
      errorMessages: [ 
        { require: 'Password is required' },
        { minLength: 'Min 8 character' },
        { maxLength: 'Max 512 character' },
        { password: 'Invalid password' }
       ]
    },
    {
      type: 'checkbox',
      name: 'isTeamsAndConditionsAccept',
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

  createRegisterForm() {
    return this.registerForm = this._fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', { asyncValidators: [emailExistsValidatorFactory(this._authService)] }],
      password: [''],
      confirmPassword: [''],
      isTeamsAndConditionsAccept: [false]
    })
  }

  onRegister() {

  }
}
