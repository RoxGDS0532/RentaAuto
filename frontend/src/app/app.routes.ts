import { Routes } from '@angular/router';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { LoginComponent } from './components/login/login.component';
import { AutosComponent } from './components/autos/autos.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ConfiReservaComponent } from './components/confi-reserva/confi-reserva.component';
import { PromocionesComponent } from './components/promociones/promociones.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { Error404Component } from './components/error404/error404.component';
import { Error500Component } from './components/error500/error500.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { PoliticasComponent } from './components/politicas/politicas.component';
import { TarifasComponent } from './components/tarifas/tarifas.component';

export const routes: Routes = [
    { path: '', component: HomeUserComponent, data: { titulo: 'Home' } },
    { path: 'auto', component: AutosComponent, data: { titulo: 'Auto' }},
    { path: 'confi', component: ConfiReservaComponent, data: { titulo: 'Confirmacion de la Reserva' }},
    { path: 'login', component: LoginComponent, data: { titulo: 'Login' } },
    { path: 'signIn', component: SignInComponent, data: { titulo: 'Registro' } },
    { path: 'promociones',  component: PromocionesComponent, data: { titulo: 'Promociones'}},
    { path: 'empresa/mision',  component: EmpresaComponent, data: { titulo: 'Empresa'}},
    { path: 'empresa/politicas',  component: PoliticasComponent, data: { titulo: 'Politicas'}},
    { path: 'empresa/tarifas',  component: TarifasComponent, data: { titulo: 'Tarifa'}},
    {path: 'reserva', component: ReservaComponent, data: {titulo: 'Editar Reserva'}},
    { path: 'mapa', component: MapaComponent, data: { titulo: 'Mapa del sitio' }},
    { path: 'error500', component: Error500Component, data: { titulo: 'error 500' }},


    { path: '**', component: Error404Component, data: { titulo: 'error 404' }},
];
