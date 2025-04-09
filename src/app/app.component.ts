import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageLayoutComponent } from "./shared/components/home-page-layout/home-page-layout.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth-interceptors/auth.interceptor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomePageLayoutComponent, HomePageLayoutComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: []
})
export class AppComponent {
  title = 'likhitan';
}
