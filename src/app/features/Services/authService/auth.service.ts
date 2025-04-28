import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { LoginResponse } from '../../Common/Models/LoginDto';
import { RefreshTokenResponse } from '../../Common/Models/RefreshTokenResponse';
import { RegisterResponse } from '../../Common/Models/RegisterResponse';
import { SendOTPResponse } from '../../Common/Models/SendOTPResponse';
import { CheckAuthResponse } from '../../Common/Models/CheckAuthResponse';
import { ForgotPasswordResponse } from '../../Common/Models/ForgotPasswordResponse';
import { LogoutResponse } from '../../Common/Models/LogoutResponse';
import { ApiEndpoints } from '../../Common/ApiEndpoints/ApiEndpoint';
import { IsEmailDomainSupportResponse } from '../../Common/Models/IsEmailDomainSupportResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public _api: ApiService) { }

  checkEmailExists(body: any = {}): Observable<{ IsEmailExists: boolean }> {
    return this._api.post(ApiEndpoints.IsEmailExists, body)
  }

  login(body: any = {}): Observable<LoginResponse> {
    return this._api.post(ApiEndpoints.Login, body);
  }

  register(body: any = {}): Observable<RegisterResponse> {
    return this._api.post(ApiEndpoints.Register, body);
  }

  refreshToken(body: any = {}): Observable<RefreshTokenResponse> {
    return this._api.post(ApiEndpoints.RefreshToken, body)
  }

  sendOtp(body: any = {}): Observable<SendOTPResponse> {
    return this._api.post(ApiEndpoints.SendOTP, body);
  }

  checkAuth(): Observable<CheckAuthResponse> {
    return this._api.get(ApiEndpoints.CheckAuth);
  }

  forgotPassWord(body: any = {}): Observable<ForgotPasswordResponse> {
    return this._api.post(ApiEndpoints.ForgotPassword, body);
  }

  logout(): Observable<LogoutResponse> {
    return this._api.get(ApiEndpoints.Logout)
  }

  isEmailDomainSupport(body: {}): Observable<IsEmailDomainSupportResponse> {
    return this._api.post(ApiEndpoints.IsEmailDomainSupport, body)
  }
}
