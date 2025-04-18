import { Routes } from '@angular/router';
import { HomePageLayoutComponent } from './shared/components/home-page-layout/home-page-layout.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { OtpComponent } from './features/otp/otp.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./shared/components/home-page-layout/home-page-layout.component').then(m => m.HomePageLayoutComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'sendotp',
        component: OtpComponent
    },
    {
        path: 'forgotpassword',
        component: ForgotPasswordComponent
    }
];
