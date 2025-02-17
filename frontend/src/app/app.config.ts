import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { provideToastr } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient,withFetch } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    NgChartsModule, 
    CommonModule,
    provideAnimations(),
    provideToastr(),
    SocialLoginModule,
    SpinnerComponent,
    BrowserModule,
    NgbModule
  ]
};
