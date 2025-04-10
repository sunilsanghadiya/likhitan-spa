import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { Observable } from 'rxjs';
import { LoginModel } from '../../login/interfaces/loginModel';
import { ApiEndpoint } from '../../Common/ApiEndpoints/ApiEndpoint';
import { LoginResponse } from '../../Common/Models/LoginDto';
import { RegisterResponse } from '../../Common/Models/RegisterResponse';

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
    return this._api.post(ApiEndpoint.Login, body);
  }
}
