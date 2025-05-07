import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { DynamicFormComponent } from '../../core/componenets/dynamic-form/dynamic-form.component';
import { FormField } from '../../core/interfaces/DynamicFields';
import { DataStoreService } from '../../core/services/dataStoreService/data-store.service';
import { NotificationService } from '../../core/services/nzNotification/nz-notification.service';
import { SenOTP } from '../Common/interfaces/SendOTPDto';
import { SendOTPResponse } from '../Common/Models/SendOTPResponse';
import { AuthService } from '../Services/authService/auth.service';
import { response } from 'express';
import { GetOTPResponse } from '../Common/Models/GetOTPResponse';
import { HelperService } from '../../core/Helper/HelperService';

@Component({
  selector: 'app-otp',
  imports: [
    NzGridModule,
    NzCardComponent,
    DynamicFormComponent
  ],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent implements OnInit {

  sendOtpForm!: FormGroup;
  otpResponse: any;

  constructor(public _fb: FormBuilder, public _router: Router, public _authService: AuthService,
    public _dataStoreService: DataStoreService<any>, 
    public _notificationService: NotificationService,
    private _helperService: HelperService
  ) { }

  ngOnInit() {
    this.createSendOTPForm();
  }

  createSendOTPForm() {
    return this.sendOtpForm = this._fb.group({
      otp: [''],
      userId: []
    })
  }

  async onSend(event: any) {
    if(event.invalid) return;
    let storedData = await this._helperService.prepareDecryptData();

    let payload = {
      otp: event.controls['otp']?.value,
      userId: storedData?.userId ?? 0
    }

    this._authService.sendOtp(payload).subscribe({
      next: (response: SendOTPResponse) => {
        if(response.data.isOtpSend === true) {
          this._notificationService.successNotification('OTP Verification', 'Your OTP is successfully verified.');
          this._router.navigate(['/home']);
        }
        else {
          this._router.navigate(['/sendotp']);
          this._notificationService.failedNotification('OTP Verification', 'OTP verification failed get new otp and try again.');
          event.reset();
        }
      },
      error: (error: any) => {
        console.log('otp screen' + error);
        this._dataStoreService.clearData();
      }
    })
  }

  formFields: FormField<SenOTP>[] = [
    {
      type: 'input',
      name: 'otp',
      label: 'OTP',
      placeholder: 'XXXXXX',
      validations: {
        required: true,
        minLength: 6,
        maxLength: 6
      },
      errorMessages: [
        { require: 'Email is required' },
        { minLength: 'Min 5 character' },
        { maxLength: 'Max 512 character' }
      ]
    }
  ]

  async getOtp() {
    let storedData = await this._helperService.prepareDecryptData();

    this._authService.getOTP({ userId: storedData?.userId }).subscribe({
      next: (response: GetOTPResponse) => {
        if(response) {
          
        }
      },
      error: (error: any) => {
        console.log(error);
        this._notificationService.failedNotification("Oops", "Unable to get new otp please try again!");
      },
      complete: () => {}
    })
  }

}
