import { Routes } from '@angular/router';
import { pathToFileURL } from 'url';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { LoginComponent } from './components/login/login.component';
import { AutosComponent } from './components/autos/autos.component';
import { SignInComponent } from'./components/sign-in/sign-in.component'
import { ConfiReservaComponent } from './components/confi-reserva/confi-reserva.component';


export const routes: Routes = [
    { path: '', component: HomeUserComponent, data: { titulo: 'Home' } },
    { path: 'auto', component: AutosComponent, data: { titulo: 'Auto' }, children: [
        { path: 'confi', component: ConfiReservaComponent, data: { titulo: 'Confirmar Reserva' } }
      ]},
    { path: 'login', component: LoginComponent, data: { titulo: 'Login' } },
    { path: 'signIn', component: SignInComponent, data: { titulo: 'Registro' } },
];
