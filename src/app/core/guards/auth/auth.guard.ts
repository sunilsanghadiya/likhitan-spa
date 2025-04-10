// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HelperService } from '../../Helper/HelperService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _helperService: HelperService, private router: Router) { }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuthenticated = this._helperService.isLoggedIn()
    
    return isAuthenticated ? true : this.router.parseUrl('/login');
  }
}
