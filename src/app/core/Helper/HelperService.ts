import { Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode';
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    passwordPattern = new RegExp(`^(?!<username>).*?(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>\\/?]).{8,}$`);

    constructor(private _cookieService: CookieService) { }

    isLoggedIn(): boolean {
        const token = this._cookieService.get('AccessToken');
        if (!token) return false;

        try {
            const decoded: any = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp > currentTime;
        } catch (err) {
            return false;
        }
    }

}