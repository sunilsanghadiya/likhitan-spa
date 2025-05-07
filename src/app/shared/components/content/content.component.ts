import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { BlogApiService } from '../../../features/Services/blogApiService/blog-api.service';
import { NotificationService } from '../../../core/services/nzNotification/nz-notification.service';

@Component({
  selector: 'app-content',
  imports: [
    NzLayoutModule,
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit, OnChanges, OnDestroy {

  constructor(private _blogApiService: BlogApiService, private _notificationService: NotificationService) { }

  ngOnDestroy() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
   
  }

  ngOnInit() {
    this.getBlogs();  
  }

  getBlogs() {
    this._blogApiService.getBlogs().subscribe({
      next: (response: any) => {
        console.log(response)
      },
      error: (error: any) => {
        console.log(error);
        this._notificationService.failedNotification("Oops", "Something went wrong while getting blogs");
      },
      complete: () => {}
    })
  }

}
