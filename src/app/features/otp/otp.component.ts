import { Component, inject, OnInit } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { DynamicFormComponent } from '../../core/componenets/dynamic-form/dynamic-form.component';
import { FormField } from '../../core/interfaces/DynamicFields';
import { SenOTP } from '../Common/interfaces/SendOTPDto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/authService/auth.service';
import { DataStoreService } from '../../core/services/dataStoreService/data-store.service';
import { SendOTPResponse } from '../Common/Models/SendOTPResponse';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';

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
  private readonly notification = inject(NzNotificationService);

  constructor(public _fb: FormBuilder, public _router: Router, public _authService: AuthService,
    public _dataStoreService: DataStoreService<any>
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

  onSend(event: any) {
    if(event.invalid) return;
    let storedData = this._dataStoreService.getData();

    let payload = {
      otp: event.controls['otp']?.value,
      userId: storedData?.data?.id ?? 0
    }

    this._authService.sendOtp(payload).subscribe({
      next: (response: SendOTPResponse) => {
        if(response.IsOtpSend) {
          this.createNotification('topRight');
          this._router.navigate(['/home']);
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

  getOtp() {
    // this._authService.
  }

  createNotification(position: NzNotificationPlacement): void {
    this.notification.blank(
      'OTP Verification',
      'Your OTP is successfully verified.',
      { nzPlacement: position }
    );
  }
}
