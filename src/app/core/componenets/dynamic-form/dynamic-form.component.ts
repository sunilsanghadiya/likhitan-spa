import { CommonModule } from '@angular/common';
import {
  AfterViewInit, Component, computed, effect,
  EnvironmentInjector, EventEmitter, Input, OnChanges,
  Output,
  runInInjectionContext,
  Signal, SimpleChanges
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { NzDatePickerComponent, NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent, NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { QuillModule } from 'ngx-quill';
import { AuthService } from '../../../features/Services/authService/auth.service';
import { ValidationRules } from '../../interfaces/DynamicFields';
import { emailExistsValidatorFactory } from '../../validators/emailExistsValidatorFactory';
import { isEmailDomainSupportValidator } from '../../validators/isEmailDomainSupportValidator';
import { matchOtherValidator } from '../../validators/PasswordValidator';
import { ControlErrorMessageComponent } from "../control-error-message/control-error-message.component";
import { HelperService } from '../../Helper/HelperService';

interface OnSubmitType {
  dynamicForm: FormGroup,
  callBack: () => void
}

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
    NzCheckboxComponent,
    NzToolTipModule,
    QuillModule
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
  standalone: true,
})
export class DynamicFormComponent implements OnChanges, AfterViewInit {

  @Input() formGroup!: FormGroup;
  @Input() isShowSubmitBtn: boolean = true;
  @Input() formFields: any;
  @Input() submitLabel: string = 'Submit';
  @Input() formStyles?: any;
  @Input() submitButtonStyle?: any;
  @Input() externalData?: any;

  @Output() onSubmit = new EventEmitter<OnSubmitType>();
  @Output() formStatusChanged = new EventEmitter<boolean>();
  @Output() dateFieldChanged = new EventEmitter<any>();
  @Output() fieldChanged = new EventEmitter<{ field: string; value: any; }>();
  @Output() customEvent = new EventEmitter<any>();
  @Output() controlClicked = new EventEmitter<any>();

  toolbarVisible = true;
  quillEditor: any;

  formValueSignal!: Signal<any>;
  formValidSignal!: Signal<boolean>;
  controlErrorsSignalMap: { [key: string]: Signal<any> } = {};

  quillConfig: any = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
    ]
  }
  toolbarElement: HTMLElement | null = null;


  constructor(public _fb: FormBuilder, private injector: EnvironmentInjector,
    private _authService: AuthService, private _helperService: HelperService
  ) { }


  ngAfterViewInit() {
    setTimeout(() => {
      this.toolbarElement = document.querySelector('.ql-toolbar');
    }, 100);
  }

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
      if (rules.email) {
        validators.push(Validators.email);
      }

      if (rules?.customValidators?.length) {
        rules.customValidators.forEach((validator: any) => {
          validators.push(validator)
        })
        asyncValidators.push(isEmailDomainSupportValidator(this._authService));
      };


      if (rules.parentControl?.controlName) validators.push(matchOtherValidator(rules?.parentControl?.controlName));

      if (rules.isServerSideCheck) {
        asyncValidators.push(emailExistsValidatorFactory(this._authService, rules.isFieldValid));
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
    this.onSubmit.emit({ dynamicForm: event, callBack: () => { this.resetForm(this.formGroup) } });
  }



  isPassword(field: any): boolean {
    return field.name.toLowerCase().includes('password');
  }

  onFieldChange(field: string, value: any) {
    this.fieldChanged.emit({ field, value });
  }

  onFieldEnter(event: KeyboardEvent) {
    // // event.preventDefault();
    // if(event.key == 'Enter') {
    //   this.customEvent.emit({ type: 'enterKeyPressed', event: event }); 
    // }
  }

  onControlClick(field: any) {
    this.controlClicked.emit({
      field: field.name,
      fieldData: field,
      externalData: this.externalData,
      formValue: this.formGroup.value
    });
  }


  resetForm(form: FormGroup) {

    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);

      if (control instanceof FormControl) {
        control.reset();
        control.setErrors(null);
        control.markAsUntouched();
        control.markAsPristine();
      }
    });

    form.markAsUntouched();
    form.markAsPristine();
  }



}
