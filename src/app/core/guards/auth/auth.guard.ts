// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { HelperService } from '../../Helper/HelperService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public _helperService: HelperService, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> {
    return this._helperService.IsUserAuthenticated().pipe(
      map((isAuthenticated) => {
        return isAuthenticated ? true : this.router.createUrlTree(['/login']);
      })
    );
  }
}
