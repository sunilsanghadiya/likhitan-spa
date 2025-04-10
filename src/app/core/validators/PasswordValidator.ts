import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function minLengthValidator(min: number = 8): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      return control.value.length < min ? { minLength: { requiredLength: min } } : null;
    };
  }
  
  export function matchOtherValidator(otherControlName: string): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control?.parent) return null;
  
      const otherControl = control.parent.get(otherControlName);
      if (!otherControl) return null;
  
      return control.value === otherControl.value ? null : { parentControl: true };
    };
  }

  export function passwordStartWithOtherValidator(passwordControlName: string, otherControlName: string): ValidatorFn {
    return (control: AbstractControl) => {
      if (!passwordControlName) return null;
  
      const otherControl = control.get(otherControlName);
      const passwordControl = control.get(passwordControlName)?.value;
      if (!otherControl) return null;
  
      return passwordControl.startsWith(otherControl.value) ? null : { isValueStartWithParentControl: true };
    };
  }
  