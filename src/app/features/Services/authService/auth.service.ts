import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { ApiEndpoint } from '../../Common/ApiEndpoints/ApiEndpoint';
import { LoginResponse } from '../../Common/Models/LoginDto';
import { RefreshTokenResponse } from '../../Common/Models/RefreshTokenResponse';
import { RegisterResponse } from '../../Common/Models/RegisterResponse';
import { SendOTPResponse } from '../../Common/Models/SendOTPResponse';
import { CheckAuthResponse } from '../../Common/Models/CheckAuthResponse';
import { ForgotPasswordResponse } from '../../Common/Models/ForgotPasswordResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  constructor(public _api: ApiService) { }

  checkEmailExists(body: any = {}): Observable<{ IsEmailExists: boolean }> {
    return this._api.post(ApiEndpoint.IsEmailExists, body)
  }

  login(body: any = {}): Observable<LoginResponse> {
    return this._api.post(ApiEndpoint.Login, body);
  }

  register(body: any = {}): Observable<RegisterResponse> {
    return this._api.post(ApiEndpoint.Register, body);
  }

  refreshToken(body: any = {}): Observable<RefreshTokenResponse> {
    return this._api.post(ApiEndpoint.RefreshToken, body)
  }

  sendOtp(body: any = {}): Observable<SendOTPResponse> {
    return this._api.post(ApiEndpoint.SendOTP, body);
  }

  checkAuth(): Observable<CheckAuthResponse> {
    return this._api.get(ApiEndpoint.CheckAuth);
  }

  forgotPassWord(body: any = {}): Observable<ForgotPasswordResponse> {
    return this._api.post(ApiEndpoint.ForgotPassword, body);
  }
}
