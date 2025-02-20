import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
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
import { FormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FormGroup, FormControl,Validators,FormBuilder } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { importProvidersFrom } from '@angular/core';
import { withComponentInputBinding } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { NgbCarouselModule, } from '@ng-bootstrap/ng-bootstrap';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,),
    provideClientHydration(),
    NgChartsModule, 
    CommonModule,
    provideAnimations(),
    provideToastr(),
    SocialLoginModule,
    SpinnerComponent,
    BrowserModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ToastrModule,
    NgxCaptchaModule,
    FormControl,
    FormBuilder,
    importProvidersFrom(ReactiveFormsModule), 
    provideRouter([], withComponentInputBinding()),
    provideHttpClient(),

    NgbCarouselModule
  ]
};
