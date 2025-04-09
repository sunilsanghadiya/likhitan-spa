import { toLabel } from './../../Helper/Helper';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NzFormItemComponent } from 'ng-zorro-antd/form';
import { NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzFormControlComponent } from 'ng-zorro-antd/form';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { NzOptionComponent } from 'ng-zorro-antd/select';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { ControlErrorMessageComponent } from "../control-error-message/control-error-message.component";
import { ValidationRules } from '../../interfaces/DynamicFields';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';


@Component({
  selector: 'app-dynamic-form',
  imports: [
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzSelectComponent,
    NzOptionComponent,
    NzDatePickerComponent,
    NzInputModule,
    NzDatePickerModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    CommonModule,
    NzRadioModule,
    ControlErrorMessageComponent,
    NzCheckboxComponent
],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
  standalone: true,
})
export class DynamicFormComponent implements OnInit {

  @Input() formGroup!: FormGroup;
  @Input() formFields: any;
  @Input() submitLabel: string = 'Submit';
  @Output() onSubmit = new EventEmitter<FormGroup>();

  constructor(public _fb: FormBuilder) { }

  ngOnInit() {
    const group: { [key: string]: FormControl } = {};
  
    for (const field of this.formFields) {
      const validators: ValidatorFn[] = [];
      const rules: ValidationRules = field.validations || {};
  
      if (rules.required) validators.push(Validators.required);
      if (rules.min !== undefined) validators.push(Validators.min(rules.min));
      if (rules.max !== undefined) validators.push(Validators.max(rules.max));
      if (rules.minLength !== undefined) validators.push(Validators.minLength(rules.minLength));
      if (rules.maxLength !== undefined) validators.push(Validators.maxLength(rules.maxLength));
      if (rules.pattern) validators.push(Validators.pattern(rules.pattern));
      if (rules.email) validators.push(Validators.email);
      if (rules.customValidator) validators.push(rules.customValidator);
   
      group[field.name as string] = this._fb.control(
        { value: this.formGroup.get(field.name)?.value ?? null, disabled: field.disabled ?? false }, 
        validators
      );

      this.formGroup.addControl(field.name, group);
    }
  }

  callSubmit() {
    this.onSubmit.emit(this.formGroup);
  }

  isPassword(field: any): boolean {
    return field.name.toLowerCase().includes('password');
  }

  // togglePasswordVisibility(fieldName: string): void {
  //   this.passwordVisibility[fieldName] = !this.passwordVisibility[fieldName];
  // }
  
}
