import { ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NotificationService } from '../../../core/services/nzNotification/nz-notification.service';
import { GetBlogDto } from '../../../features/Common/interfaces/GetBlogDto';
import { GetBlogsResponse } from '../../../features/Common/Models/GetBlogsResponse';
import { BlogApiService } from '../../../features/Services/blogApiService/blog-api.service';
// import { DynamicFormComponent } from '../../../core/componenets/dynamic-form/dynamic-form.component';


@Component({
  selector: 'app-content',
  imports: [
    NzLayoutModule,
    NzCardModule,
    NzGridModule,
    NzIconModule,
    NzButtonModule,
    // DynamicFormComponent
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit, OnChanges, OnDestroy {

  isShowLoader: boolean = false;
  blogs: any;

  constructor(private _blogApiService: BlogApiService, private _notificationService: NotificationService) 
  {
  }

  ngOnDestroy() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
   
  }

  ngOnInit() {
    this.getBlogs();  
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
      complete: () => {}
    })
  }

}
