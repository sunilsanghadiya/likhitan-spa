import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageLayoutComponent } from "./shared/components/home-page-layout/home-page-layout.component";
import { LoadingSpinnerComponent } from "./core/componenets/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: []
})
export class AppComponent {
  title = 'likhitan';
}
