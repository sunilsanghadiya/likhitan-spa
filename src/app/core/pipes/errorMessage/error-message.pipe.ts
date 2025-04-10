import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'errorMessage',
  standalone: true,
  pure: false
})
export class ErrorMessagePipe implements PipeTransform {

  transform(control: AbstractControl | null, getErrorMessage: (errorKey: string, errorValue?: any) => string): string[] {
    if (!control || !control.errors || !(control.dirty || control.touched)) return [];

    return Object.entries(control.errors)?.map(([key, value]) => getErrorMessage(key, value));
  }

}
