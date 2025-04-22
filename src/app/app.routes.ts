import { Routes } from '@angular/router';
import { HomePageLayoutComponent } from './shared/components/home-page-layout/home-page-layout.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { OtpComponent } from './features/otp/otp.component';
import { ErrorComponent } from './core/componenets/error/error.component';
<<<<<<< HEAD
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
=======
import { ErrorComponent } from './core/componenets/error/error.component';
>>>>>>> 38d53ce (resolve home route issue and make error component)

export const routes: Routes = [
    {
        path: 'home',
        component: HomePageLayoutComponent,
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
    {   path: 'error', 
        component: ErrorComponent 
    },
    {   path: '**', 
        redirectTo: 'error' 
    }
];
