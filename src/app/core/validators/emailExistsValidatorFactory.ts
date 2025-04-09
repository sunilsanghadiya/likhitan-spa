import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, map, catchError, first } from 'rxjs/operators';
import { AuthService } from '../../features/Services/authService/auth.service';

export function emailExistsValidatorFactory(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) return of(null);

    return of(control.value).pipe(
      debounceTime(300),
      switchMap(email =>
        authService.checkEmailExists(email).pipe(
          map((exists: any) => (exists ? { emailExists: true } : { emailExists: false } )),
          catchError(() => of(null)) // fallback on error
        )
      ),
      first()
    );
  };
}
