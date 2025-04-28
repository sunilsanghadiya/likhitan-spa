import { Routes } from '@angular/router';
import { ErrorComponent } from './core/componenets/error/error.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { LoginComponent } from './features/login/login.component';
import { OtpComponent } from './features/otp/otp.component';
import { RegisterComponent } from './features/register/register.component';
import { HomePageLayoutComponent } from './shared/components/home-page-layout/home-page-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomePageLayoutComponent,
        // data: { userRoles: [UserRoles.Standard] },
        canActivate: [AuthGuard],
        // resolve: { userRoles: roleResolverResolver },
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin-panel',
        component: DashboardComponent,
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
    {
        path: 'error',
        component: ErrorComponent
    },
    {
        path: '**',
        redirectTo: 'error'
    }
];
