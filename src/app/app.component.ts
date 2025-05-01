import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { LoadingSpinnerComponent } from "./core/componenets/loading-spinner/loading-spinner.component";
import { LoadingService } from './core/services/loadingService/loading.service';
import { ModelService } from './core/services/modelService/model.service';
// import { NetworkStatusComponent } from "./core/componenets/network-status/network-status.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ ModelService ]
})
export class AppComponent {
  title = 'likhitan';

  constructor(public router: Router, public loader: LoadingService) {
    this.routeLoader();
  }

  private routeLoader(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.loader.show(true);
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loader.hide(false);
      }
    });
  }
}
