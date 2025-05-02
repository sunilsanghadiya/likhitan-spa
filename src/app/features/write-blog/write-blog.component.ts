import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzContentComponent, NzLayoutComponent } from 'ng-zorro-antd/layout';
import { DynamicFormComponent } from "../../core/componenets/dynamic-form/dynamic-form.component";
import { WriteBlogDto } from '../Common/interfaces/WriteBlogDto';
import { FormField } from './../../core/interfaces/DynamicFields';

@Component({
  selector: 'app-write-blog',
  imports: [
    DynamicFormComponent,
    NzLayoutComponent,
    NzContentComponent
  ],
  templateUrl: './write-blog.component.html',
  styleUrl: './write-blog.component.css'
})
export class WriteBlogComponent implements OnInit {

  writeBlogForm!: FormGroup;
  formFields!: FormField<WriteBlogDto>[];

  constructor(public _fb: FormBuilder) { }

  ngOnInit() {
    this.createWriteBlogForm();
    this.prepareForm();
    this.prepareFormFieldStyles();
  }

  createWriteBlogForm() {
    return this.writeBlogForm = this._fb.group({
      title: [],
      body: []
    })
  }

  prepareForm() {
    let formFieldsData: FormField<WriteBlogDto>[] = [
      {
        type: 'input',
        name: 'title',
        label: 'Title',
        className: 'largeInputForTitleField',
        id: 'titleId',
        placeholder: 'Title',
        hidden: true,
        validations: {
          required: true,
          minLength: 5,
          maxLength: 2024
        },
        errorMessages: [
          { require: 'Email is required.' },
          { minLength: 'Min 5 character.' },
          { maxLength: 'Max 2024 character.' }
        ]
      },
      {
        type: 'input',
        name: 'body',
        label: 'Content',
        className: 'mediumInputForBodyField',
        placeholder: 'Content',
        hidden: true,
        validations: {
          required: true,
          minLength: 10
        },
        errorMessages: [
          { require: 'Password is required.' },
          { minLength: 'Min 10 character.' }
        ]
      }
    ]

    return this.formFields = formFieldsData;
  }

  prepareFormFieldStyles() {
    this.formFields = this.formFields?.map((field: any) => {
      if (field.className) {
        return {
          ...field,
          className: field.className
        };
      }
      return field;
    });
  }

  onSubmitCall(event: any) {

  }

}
