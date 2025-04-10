import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingSpinnerComponent } from "./core/componenets/loading-spinner/loading-spinner.component";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    CookieService
  ]
})
export class AppComponent {
  title = 'likhitan';
}
