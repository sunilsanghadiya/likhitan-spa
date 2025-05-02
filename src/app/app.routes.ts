import { Routes } from '@angular/router';
import { HomePageLayoutComponent } from './shared/components/home-page-layout/home-page-layout.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { OtpComponent } from './features/otp/otp.component';
import { ErrorComponent } from './core/componenets/error/error.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { WriteBlogComponent } from './features/write-blog/write-blog.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomePageLayoutComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'new-blog',
        component: WriteBlogComponent,
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
        path: 'forgotpassword',
        component: ForgotPasswordComponent
    },
    {
        path: 'sendotp',
        component: OtpComponent
    },
    {   path: 'error', 
        component: ErrorComponent 
    },
    {   path: '**', 
        redirectTo: 'error' 
    }
];
