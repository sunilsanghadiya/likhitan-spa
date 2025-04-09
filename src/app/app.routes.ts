import { Routes } from '@angular/router';
import { HomePageLayoutComponent } from './shared/components/home-page-layout/home-page-layout.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageLayoutComponent
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
        path: '**',
        component: HomePageLayoutComponent
    }
];
