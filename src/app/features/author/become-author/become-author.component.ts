import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicFormComponent } from '../../../core/componenets/dynamic-form/dynamic-form.component';
import { Gender } from '../../../core/enums/Gender';
import { enumToDropdownOptions } from '../../../core/Helper/Helper';
import { BecomeAuthorDto } from '../../Common/interfaces/BecomeAuthorDto';
import { AuthorApiService } from '../../Services/authorApiService/author-api.service';
import { FormField } from './../../../core/interfaces/DynamicFields';

@Component({
  selector: 'app-become-author',
  imports: [DynamicFormComponent],
  templateUrl: './become-author.component.html',
  styleUrl: './become-author.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BecomeAuthorComponent implements OnInit {

  formFields: any;
  becomeAuthorForm!: FormGroup;
  @Output() formSubmit = new EventEmitter<any>();


  constructor(public _fb: FormBuilder, private _authorApiService: AuthorApiService) { }

  ngOnInit() {
    this.createBecomeAuthorForm();
    this.prepareFormField();
  }

  prepareFormField() {
    let formFieldsData: FormField<BecomeAuthorDto>[] = [
      {
        type: 'select',
        name: 'gender',
        label: 'Gender',
        placeholder: 'Select gender',
        options: enumToDropdownOptions(Gender),
        validations: {
          required: true,
        },
        errorMessages: [
          { require: 'gender is required.' },
        ]
      },
      {
        type: 'date',
        name: 'dob',
        label: 'Date of birth',
        placeholder: 'Select dob',
        validations: {
          required: true,
        },
        errorMessages: [
          { require: 'date of birth is required.' },
        ]
      }
    ]
    return this.formFields = formFieldsData;
  }

  createBecomeAuthorForm() {
    return this.becomeAuthorForm = this._fb.group({
      gender: [],
      dob: []
    })
  }

  onSubmitForm(event: any) {
    this.formSubmit.emit(event);
  }

  fieldValueChanged(event: any) {
  }


  
}
