import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzContentComponent, NzLayoutComponent } from 'ng-zorro-antd/layout';
import { DynamicFormComponent } from "../../core/componenets/dynamic-form/dynamic-form.component";
import { WriteBlogDto } from '../Common/interfaces/WriteBlogDto';
import { FormField } from './../../core/interfaces/DynamicFields';
import { BlogApiService } from '../Services/blogApiService/blog-api.service';
import { HelperService } from '../../core/Helper/HelperService';
import { NotificationService } from '../../core/services/nzNotification/nz-notification.service';
import { WriteBlogResponse } from '../Common/Models/WriteBlogResponse';
import { Router } from '@angular/router';

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

  constructor(public _fb: FormBuilder, private _blogApiService: BlogApiService, private _helperService: HelperService,
    private _notificationService: NotificationService, private _router: Router
  ) { }

  ngOnInit() {
    this.createWriteBlogForm();
    this.prepareForm();
    this.prepareFormFieldStyles();
  }

  createWriteBlogForm() {
    return this.writeBlogForm = this._fb.group({
      title: [],
      content: []
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
        type: 'isThirdPartyComponent',
        name: 'content',
        label: '',
        id: 'thirdPartyInId',
        className: 'mediumInputForBodyField',
        placeholder: 'Write something...',
        hidden: true,
        validations: {
          required: true,
          minLength: 10
        },
        errorMessages: [
          { require: 'content is required.' },
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

  async onSubmitCall(event: any) {
    if (!event) {
      return;
    }
  
    try {
      const storedData = await this._helperService.prepareDecryptData();
      
      if (!storedData?.authorId) {
        this._notificationService.failedNotification("Error", "Author information not found");
        return;
      }
  
      const payload: WriteBlogDto = {
        title: event.controls["title"]?.value?.trim(),
        content: event.controls['content']?.value?.trim(),
        authorId: storedData.authorId
      };
  
      if (!payload.title || !payload.content) {
        this._notificationService.failedNotification("Validation Error", "Title and content are required");
        return;
      }
  
      this._blogApiService.writeBlog(payload).subscribe({
        next: (response: WriteBlogResponse) => {
          if (response) {
            this._notificationService.successNotification("Success", "Blog created successfully");
            this._router.navigate(['/home']);
          }
        },
        error: (error: any) => {
          console.error('Blog creation error:', error);
          const errorMessage = error.error?.message || 'Something went wrong!';
          this._notificationService.failedNotification("Error", errorMessage);
        }
      });
    } catch (error) {
      console.error('Error in onSubmitCall:', error);
      this._notificationService.failedNotification("Error", "Failed to process your request");
    }
  }

}
