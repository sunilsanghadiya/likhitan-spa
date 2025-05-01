import { HttpContextToken, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { AuthService } from "../../features/Services/authService/auth.service";
import { ModelService } from "../services/modelService/model.service";

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    passwordPattern = new RegExp(`^(?!<username>).*?(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>\\/?]).{8,}$`);
    isModalVisible: boolean = false;

    constructor(public _authService: AuthService, private _modelService: ModelService) { }

    IsUserAuthenticated(): Observable<boolean> {
        return this._authService.checkAuth().pipe(
          map((res: any) => {
            return true; // or some logic based on res
          }),
          catchError((error: any) => {
            console.log(error);
            return of(false);
          })
        );
    }

    public mergeHeaders(baseHeaders: HttpHeaders, additionalHeaders: Record<string, string>): HttpHeaders {
      let headers = baseHeaders;
  
      // Add or override headers with the additional ones
      for (const [key, value] of Object.entries(additionalHeaders)) {
        if (value !== undefined && value !== null) {
          headers = headers.set(key, value);
        }
      }
  
      return headers;
    }

    public  ADDITIONAL_HEADERS = new HttpContextToken<Record<string, string>>(
      () => ({})
    );

    public showServerDownModal() {
      if (!this.isModalVisible) {
        this.isModalVisible = true;
        this._modelService.openCustomModal({
          title: 'Become author',
          content: 'Unable to connect to the server. Please check your internet connection or try again later.',
          width: '700px',
          nzOkText: 'Retry',
          nzCancelText: 'Close',
          onOk: () => {
            return new EventEmitter<void>();
          }
        })
      }
      return throwError(() => new Error('Server unavailable'));
    }
}