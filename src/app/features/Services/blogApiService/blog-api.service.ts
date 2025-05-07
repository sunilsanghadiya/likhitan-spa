import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { Observable } from 'rxjs';
import { WriteBlogResponse } from '../../Common/Models/WriteBlogResponse';
import { ApiEndpoints } from '../../Common/ApiEndpoints/ApiEndpoint';

@Injectable({
  providedIn: 'root'
})
export class BlogApiService {

  constructor(private _apiService: ApiService) { }

  writeBlog(body: any = {}): Observable<WriteBlogResponse> {
    return this._apiService.post(ApiEndpoints.WriteBlog, body);
  }
}
