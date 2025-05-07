import { QuillModule } from 'ngx-quill';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth-interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error-interceptors/error.interceptor';
import { LoggingInterceptor } from './core/interceptors/loaderInterceptor/loader.interceptor';
import { RefreshTokenInterceptor } from './core/interceptors/refreshToken-interceptor/refresh-token.interceptor';
import { TimingInterceptor } from './core/interceptors/timing-interceptor/timing.interceptor';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { provideNzI18n, en_US } from 'ng-zorro-antd/i18n';
import { serverDownInterceptor } from './core/interceptors/serverDownInterceptor/server-down.interceptor';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNzI18n(en_US),
    NzModalModule,
    AuthGuard,
    NzModalService,
    QuillModule,
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay(), withHttpTransferCacheOptions({
      includePostRequests: true
    })),
    provideAnimations(),
    provideHttpClient(withInterceptors([
      LoggingInterceptor,
      ErrorInterceptor,
      AuthInterceptor,
      TimingInterceptor,
      RefreshTokenInterceptor,
      // serverDownInterceptor
    ]), withFetch())
  ]
};
