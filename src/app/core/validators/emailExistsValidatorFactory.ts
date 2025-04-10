import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { of, timer } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../features/Services/authService/auth.service';

export function emailExistsValidatorFactory(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) return of(null); 

    return timer(500).pipe( 
      switchMap(() =>
        authService.checkEmailExists({email: control.value}).pipe(
          map((res: any) => (res.data["isEmailExists"] ? { emailExists: true } : null)),
          catchError(() => of(null)) // Handle API errors gracefully
        )
      )
    );
  };
}
