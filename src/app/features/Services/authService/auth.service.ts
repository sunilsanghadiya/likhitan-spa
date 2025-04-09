import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { Observable } from 'rxjs';
import { LoginModel } from '../../login/interfaces/loginModel';
import { ApiEndpoint } from '../../Common/ApiEndpoints/ApiEndpoint';
import { LoginResponse } from '../../Common/Models/LoginDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  constructor(public _api: ApiService) { }

  checkEmailExists(email: string): Observable<{ email: string }> {
    return this._api.get(ApiEndpoint.IsEmailExists, email)
  }

  login(body: any = {}): Observable<LoginResponse> {
    return this._api.post(ApiEndpoint.Login, body);
  }
}
