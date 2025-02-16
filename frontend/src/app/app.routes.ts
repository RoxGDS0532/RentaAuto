import { Routes } from '@angular/router';
import { pathToFileURL } from 'url';
import { HomeUserComponent } from './components/home-user/home-user.component';

export const routes: Routes = [
    {path: '', component: HomeUserComponent},
];
