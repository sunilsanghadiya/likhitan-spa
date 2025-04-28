import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { of, timer } from 'rxjs';
import { switchMap, map, catchError, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from '../../features/Services/authService/auth.service';

// export function emailExistsValidatorFactory(authService: AuthService, shouldExist: boolean = false): AsyncValidatorFn {
//   return (control: AbstractControl) => {
//     if (!control.value) return of(null); 

//     return timer(500).pipe( 
//       switchMap(() =>
//         authService.checkEmailExists({email: control.value}).pipe(
//           map((res: any) => {
//             const exists = res.data?.isEmailExists;

//             if (exists !== shouldExist) {
//               return shouldExist
//                 ? { emailNotFound: true }   // should exist but doesn't
//                 : { emailExists: true };    // should not exist but does
//             }

//             return null; // valid
//           }),
//           catchError(() => of(null)) // Handle API errors gracefully
//         )
//       )
//     );
//   };
// }

export function emailExistsValidatorFactory(authService: AuthService, shouldExist: boolean = false): AsyncValidatorFn {
  return (control: AbstractControl) => {
    // Skip if sync validations haven't passed
    if (control.errors && Object.keys(control.errors)
      .some(key => key !== 'emailExists')) {
      return of(null);
    }

    return of(control.value).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(value => {
        if (!value) return of(null);

        return authService.checkEmailExists({ email: value }).pipe(
          map((res: any) => {
            const exists = res.data?.isEmailExists;
            if (exists !== shouldExist) {
              return shouldExist
                ? { emailNotFound: true }   // should exist but doesn't
                : { emailExists: true };    // should not exist but does
            }
            return null;
          }),
          catchError(() => of(null))
        );
      })
    );
  };
}

export function emailExistsValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) return of(null);

    return timer(500).pipe(
      switchMap(() =>
        authService.checkEmailExists({ email: control.value }).pipe(
          map((res: any) => (res.data["isEmailExists"] ? null : { emailExists: true })),
          catchError(() => of(null)) // Handle API errors gracefully
        )
      )
    );
  };
}