import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { AuthInterceptor } from './core/interceptors/auth-interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error-interceptors/error.interceptor';
import { TimingInterceptor } from './core/interceptors/timing-interceptor/timing.interceptor';
import { RefreshTokenInterceptor } from './core/interceptors/refreshToken-interceptor/refresh-token.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoggingInterceptor } from './core/interceptors/loaderInterceptor/loader.interceptor';
import { AuthGuard } from './core/guards/auth/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    AuthGuard,
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
      RefreshTokenInterceptor
    ]))
  ]
};
