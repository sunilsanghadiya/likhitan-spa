import { AbstractControl, ValidationErrors } from "@angular/forms";

export type FieldType = 'input' | 'select' | 'checkbox' | 'date' | 'isThirdPartyComponent';

export interface BaseField<T> {
  type: FieldType; // 'text', 'number', 'select', 'checkbox', etc.
  name: keyof T;
  label?: string;
  value?: any;
  placeholder?: string;
  validations?: ValidationRules;
  options?: { label: string; value: any }[]; // For select, radio, etc.
  hidden?: boolean;
  disabled?: boolean;
  errorMessages?: any[];
  tooltip?: string
  className?: string;
  id?: any;
}

export interface isThirdPartyComponentField<T> extends BaseField<T> {
  type: 'isThirdPartyComponent',
  error?: any[]
}


export interface TextField<T> extends BaseField<T> {
  type: 'input' | 'select' | 'checkbox' | 'date';
  errors?: any[];
}

export interface SelectField<T> extends BaseField<T> {
  type: 'select';
  options: { label: string; value: any }[];
  errors?: any[];
}

export type FormField<T> = TextField<T> | SelectField<T> | isThirdPartyComponentField<T>;

export interface ValidationRules {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  email?: boolean;
  password?: boolean;
  customValidators?: Array<{ validator: (control: AbstractControl) => ValidationErrors | null; errorKey: string; }>;
  errorMessages?: any[];
  parentControl?: any;
  isServerSideCheck?: boolean;
  isValueStartWithParentControl?: boolean;
  isFieldValid?: boolean
}