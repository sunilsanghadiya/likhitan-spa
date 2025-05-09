import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IconService } from '@ant-design/icons-angular';
import { LikeOutline, SearchOutline } from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { DynamicFormComponent } from "../../../core/componenets/dynamic-form/dynamic-form.component";
import { QuillContentViewerComponent } from "../../../core/componenets/quill-content-viewer/quill-content-viewer.component";
import { BlogActionTypes } from '../../../core/enums/BlogActionTypes';
import { HelperService } from '../../../core/Helper/HelperService';
import { NotificationService } from '../../../core/services/nzNotification/nz-notification.service';
import { GetBlogDto } from '../../../features/Common/interfaces/GetBlogDto';
import { BlogCommentResponse } from '../../../features/Common/Models/BlogCommentResponse';
import { GetBlogsResponse } from '../../../features/Common/Models/GetBlogsResponse';
import { BlogApiService } from '../../../features/Services/blogApiService/blog-api.service';
import { FormField } from './../../../core/interfaces/DynamicFields';
import { BlogCommentDto } from './../../../features/Common/interfaces/BlogCommentDto';
// import { DynamicFormComponent } from '../../../core/componenets/dynamic-form/dynamic-form.component';


@Component({
  selector: 'app-content',
  imports: [
    NzLayoutModule,
    NzCardModule,
    NzGridModule,
    NzIconModule,
    NzButtonModule,
    QuillContentViewerComponent,
    DynamicFormComponent
],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit, OnChanges, OnDestroy {

  isShowLoader: boolean = false;
  blogs: any;
  commentForm!: FormGroup;
  formFields: any;
  blogId!: number;

  constructor(private _blogApiService: BlogApiService, private _notificationService: NotificationService, 
    public _iconService: IconService,
    private _fb: FormBuilder,
    private _helperService: HelperService
  ) {
    this._iconService.addIcon(LikeOutline, SearchOutline)
  }

  ngOnDestroy() {

  }

  ngOnChanges(changes: SimpleChanges) {

  }

  ngOnInit() {
    this.getBlogs();
    this.createBlogCommentForm();
    this.prepareFormField();
    this._helperService.prepareFormFieldStyles(this.formFields);
  }

  createBlogCommentForm() {
    return this.commentForm =  this._fb.group({
      comment: ['']
    })
  }

  prepareFormField() {
    let formFieldData: FormField<BlogCommentDto>[] = [
      {
        type: 'input',
        name: 'comment',
        label: 'Comment',
        className: 'blogCommentFieldClass',
        id: 'blogCommentFieldId',
        placeholder: 'Comment',
        hidden: true,
        validations: {
          minLength: 1,
          maxLength: 2024
        },
        errorMessages: [
          { minLength: 'Min 1 character.' },
          { maxLength: 'Max 2024 character.' }
        ]
      }
    ]
    return this.formFields = formFieldData;
  }

  getBlogs() {
    this.isShowLoader = true;

    let payload: GetBlogDto = {
      pageNumber: 1,
      pageSize: 10
    }

    this._blogApiService.getBlogs(payload).subscribe({
      next: (response: GetBlogsResponse) => {
        this.isShowLoader = false;
        this.blogs = response.data;
      },
      error: (error: any) => {
        this.isShowLoader = false;
        console.log(error);
        this._notificationService.failedNotification("Oops", "Something went wrong while getting blogs");
      },
      complete: () => { }
    })
  }

  onEnterKeyPressed(event: any) {
    if (event.type === 'enterKeyPressed') {
      console.log(event)
    }
  }

  async onSendComment(event: any) {
    if(event) {
      let storedData = await this._helperService.prepareDecryptData();

      let payload: BlogCommentDto = {
        loggedInUserId: storedData?.userId,
        blogId: this.blogId,
        actionType: BlogActionTypes.Comment,
        comment: event.dynamicForm.controls['comment']?.value
      }
      this._blogApiService.blogAction(payload).subscribe({
        next: (response: BlogCommentResponse) => {
          event.callBack();
          if(response) {
            if(this.commentForm.valid) {
            }
          }
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => { }
      })
    }
  }

  onControlClicked(event: any) {
    if(event) {
      this.blogId = event.externalData?.blogId
    }
  }
}
