import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { ApiEndpoints } from '../../Common/ApiEndpoints/ApiEndpoint';
import { Observable } from 'rxjs';
import { BecomeAuthorResponse } from '../../Common/Models/BecomeAuthorResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthorApiService {

  constructor(public _apiService: ApiService) { }

  getAuthorById(id: number) {
    return this._apiService.get(ApiEndpoints.GetAuthorById, id);
  }

  saveBecomeAuthor(body: any = {}): Observable<BecomeAuthorResponse> {
    return this._apiService.post(ApiEndpoints.BecomeAuthor, body);
  }
}
