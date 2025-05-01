import { FormGroup } from "@angular/forms";

export const toLabel = (fieldName: string): string => {
    return fieldName
        .replace(/([A-Z])/g, ' $1')       // camelCase to space
        .replace(/[_-]/g, ' ')            // snake_case or kebab-case to space
        .replace(/\b\w/g, char => char.toUpperCase()) // capitalize first letters
        .trim();
}


export const markFormGroupTouched = (formGroup: FormGroup) => {
    Object.values(formGroup.controls).forEach(control => {
        control.markAsTouched();

        if ((control as any).controls) {
            markFormGroupTouched(control as FormGroup);
        }
    });
}

export const getDynamicFormControls = (formGroup: FormGroup) => 
    formGroup.controls

export function enumToDropdownOptions(enumObj: any, labelFormat: (key: string) => string = (key) => 
      key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
  ): { label: string; value: any }[] {
    return Object.keys(enumObj)
      .filter(key => isNaN(Number(key))) 
      .map(key => ({
        label: labelFormat(key),
        value: enumObj[key]
      }));
  }