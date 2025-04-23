import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Env } from '../../../../env/env';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  public baseUrl = Env.BASE_URL;

  constructor(public http: HttpClient) { }

  /**
   * Performs a GET request.
   * @param endpoint API endpoint (e.g., '/users')
   * @param params Optional query parameters
   */
  get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { params: this.buildParams(params), withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  /**
   * Performs a POST request.
   * @param endpoint API endpoint (e.g., '/users')
   * @param body Request payload
   */
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  /**
   * Performs a PUT request.
   * @param endpoint API endpoint (e.g., '/users/1')
   * @param body Request payload
   */
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  /**
   * Performs a DELETE request.
   * @param endpoint API endpoint (e.g., '/users/1')
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  /**
   * Converts an object to HttpParams.
   * @param params Object with key-value pairs
   */
  private buildParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return httpParams;
  }

  /**
   * Handles API errors globally.
   * @param error HTTP error response
   */
  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error(error?.error?.message || 'Something went wrong!'));
  }
}
