import { HttpClient, HttpContextToken, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, shareReplay } from "rxjs";
import { AuthService } from "../../features/Services/authService/auth.service";
import { UserRoles } from "../enums/UserRoles";

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    passwordPattern = new RegExp(`^(?!<username>).*?(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>\\/?]).{8,}$`);

    private currentRoleSubject = new BehaviorSubject<UserRoles>(UserRoles.Standard);
    
    constructor(public _authService: AuthService) { }

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

    getCurrentUserRole(): UserRoles {
      return this.currentRoleSubject.value;
    }
  
    setCurrentUserRole(role: UserRoles): void {
      this.currentRoleSubject.next(role);
    }
}