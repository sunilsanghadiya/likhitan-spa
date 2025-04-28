import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { AuthService } from "../../features/Services/authService/auth.service";
import { catchError, map, of, switchMap, timer } from "rxjs";

export function isEmailDomainSupportValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) return of(null);

    return timer(500).pipe(
      switchMap(() =>
        authService.isEmailDomainSupport({ email: control.value }).pipe(
          map((res: any) => (res.data["isEmailSupport"] ? null : { isEmailSupport: true })),
          catchError(() => of(null))
        )
      )
    );
  };
}