import { Routes } from '@angular/router';
import { pathToFileURL } from 'url';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { LoginComponent } from './components/login/login.component';
import { AutosComponent } from './components/autos/autos.component';
import { SignInComponent } from'./components/sign-in/sign-in.component'


export const routes: Routes = [
    {path: '', component: HomeUserComponent, data:{titulo:'Home'}},
    {path:'login',component:LoginComponent},
    {path:'auto', component:AutosComponent, data:{titulo:'Flota'}},
    {path:'signIn',component:SignInComponent}
];
