import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'; 
import { RegistrationComponent } from './components/registration/registration.component'; // Example standalone component

export const routes: Routes = [
   { path: 'login', component: LoginComponent },
   {path:'registration' , component:RegistrationComponent}, 
   {path : '',redirectTo : '/login',pathMatch : 'full'},
   {path : '**',redirectTo : 'login',pathMatch : 'full'}
];
