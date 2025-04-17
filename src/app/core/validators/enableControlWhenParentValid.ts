import { AbstractControl } from "@angular/forms";

export function enableControlWhenParentValid(parentControl: AbstractControl | null, childControl: AbstractControl | undefined, condition: (value: any) => boolean
  ) {
    parentControl?.valueChanges.subscribe((value:any) => {
      if (condition(value)) {
        childControl?.enable({ emitEvent: false });
      } else {
        childControl?.disable({ emitEvent: false });
      }
    });
  }
  