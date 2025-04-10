import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    passwordPattern = new RegExp(`^(?!<username>).*?(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>\\/?]).{8,}$`);

    constructor() { }
}