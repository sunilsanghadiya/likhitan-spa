import { toLabel } from './../../Helper/Helper';
import { Component, computed, effect, EnvironmentInjector, EventEmitter, Input, OnChanges, OnInit, Output, runInInjectionContext, Signal, signal, SimpleChanges } from '@angular/core';
import { AsyncValidator, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
import { matchOtherValidator, passwordStartWithOtherValidator } from '../../validators/PasswordValidator';
import { toSignal } from '@angular/core/rxjs-interop';
import { emailExistsValidatorFactory } from '../../validators/emailExistsValidatorFactory';
import { AuthService } from '../../../features/Services/authService/auth.service';


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
export class DynamicFormComponent implements OnChanges {

  @Input() formGroup!: FormGroup;
  @Input() formFields: any;
  @Input() submitLabel: string = 'Submit';
  @Output() onSubmit = new EventEmitter<FormGroup>();
  @Output() formStatusChanged = new EventEmitter<boolean>();

  formValueSignal!: Signal<any>;
  formValidSignal!: Signal<boolean>;
  controlErrorsSignalMap: { [key: string]: Signal<any> } = {};

  constructor(public _fb: FormBuilder, private injector: EnvironmentInjector,
    private _authService: AuthService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formFields'] || changes['formGroup']) {
      this.generateForm();
      this.setupSignals();
    }
  }

  setupSignals() {
    runInInjectionContext(this.injector, () => {
      this.formValueSignal = toSignal(this.formGroup.valueChanges, {
        initialValue: this.formGroup.value,
      });
  
      this.formValidSignal = computed(() => this.formGroup.valid);
  
      effect(() => {
        this.formStatusChanged.emit(this.formValidSignal());
      });
  
      for (const key of Object.keys(this.formGroup.controls)) {
        const control = this.formGroup.get(key)!;
        this.controlErrorsSignalMap[key] = computed(() => {
          if (!control.touched && !control.dirty) return null;
          return control.errors;
        });
      }
    });
  }

  generateForm() {
    const group: { [key: string]: FormControl } = {};

    for (const field of this.formFields) {
      const validators: ValidatorFn[] = [];
      const asyncValidators: AsyncValidatorFn[] = [];
      const rules: ValidationRules = field.validations || {};

      if (rules.required) validators.push(Validators.required);
      if (rules.min !== undefined) validators.push(Validators.min(rules.min));
      if (rules.max !== undefined) validators.push(Validators.max(rules.max));
      if (rules.minLength !== undefined) validators.push(Validators.minLength(rules.minLength));
      if (rules.maxLength !== undefined) validators.push(Validators.maxLength(rules.maxLength));
      if (rules.pattern) validators.push(Validators.pattern(rules.pattern));
      if (rules.email) validators.push(Validators.email);
      if (rules.customValidator) validators.push(rules.customValidator);
      if(rules.parentControl?.controlName) validators.push(matchOtherValidator(rules?.parentControl?.controlName));

      if (rules.isServerSideCheck) {
        asyncValidators.push(emailExistsValidatorFactory(this._authService));
      }

      group[field.name] = this._fb.control({
        value: this.formGroup.get(field.name)?.value, disabled: field.disabled ?? false
      },
      {
        validators,
        asyncValidators,
        updateOn: 'blur'
      }
      );
      
    }
    this.formGroup = this._fb.group(group);
  }

  callSubmit(event: any) {
    event = this.formGroup
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    this.onSubmit.emit(event);
  }

  isPassword(field: any): boolean {
    return field.name.toLowerCase().includes('password');
  }

  // togglePasswordVisibility(fieldName: string): void {
  //   this.passwordVisibility[fieldName] = !this.passwordVisibility[fieldName];
  // }

}
