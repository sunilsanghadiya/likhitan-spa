import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  @Input() errorCode: number = 500;
  @Input() message: string = 'Something went wrong!';

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.errorCode = +params['code'] || 500;
      this.message = params['message'] || this.message;
    });
  }
  
}
