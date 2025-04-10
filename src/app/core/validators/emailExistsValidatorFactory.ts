import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, map, catchError, first } from 'rxjs/operators';
import { AuthService } from '../../features/Services/authService/auth.service';

export function emailExistsValidatorFactory(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {

    if (!control.value) return of(null);

    return of(control.value).pipe(
      debounceTime(350),
      switchMap(emailVal =>
        authService.checkEmailExists({email: emailVal}).pipe(
          map((res: any) => ((res.IsEmailExists === true) ? null : { emailExists: true } )),
          catchError(() => of(null))
        )
      ),
      first()
    );
  };
}
