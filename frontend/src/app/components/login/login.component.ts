
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { UserglobalService } from 'src/app/services/userglobal.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { BreadcrumbsComponent } from "../../shared/breadcrumbs/breadcrumbs.component";
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterModule,
    FormsModule,
    CommonModule,
    SpinnerComponent,
    NgxCaptchaModule,
    BreadcrumbsComponent,
    FooterComponent,
    NavbarComponent,
    
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading: boolean = false;
  isBrowser: boolean;
  siteKey: string = '6Lcdg90qAAAAAE80uDMWIVZ6Z6c9J0zhq8HpxJGJ'; // Clave de sitio reCAPTCHA
  searchTerm: string = '';
  searchResults: { nombre: string; descripcion: string; url: string }[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private authService: AuthService,
    private userGlobalService: UserglobalService,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      console.warn('Recaptcha no se ejecuta en el servidor.');
    }
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required] // reCAPTCHA obligatorio
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.toastr.error('Por favor, complete todos los campos', 'Error');
      return;
    }

    const { username, password } = this.loginForm.value;
    const user: User = { username, password };

    this.loading = true;
    this.toastr.info('Iniciando sesión...', 'Cargando');

 
    this.authService.login(username, password).subscribe({
      next: (response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.userGlobalService.setUserName(username);
          this.toastr.success('Inicio de sesión exitoso', 'Bienvenido!');
          this.router.navigate(['/dashboard']);
        } else {
          this.toastr.error('No se recibió token', 'Error');
        }
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error de login', error);
        if (error.status === 404) {
          this.toastr.error('El usuario no existe', 'Error');
        } else if (error.status === 400) {
          this.toastr.error('Usuario o contraseña incorrectos', 'Error');
        } else {
          this.toastr.error('Ocurrió un error inesperado', 'Error');
        }
        this.loading = false;
      }
    });
    


  }

  keywords = [
    { nombre: 'Autos Disponibles', descripcion: 'Consulta la lista de autos en renta.', url: '/auto' },
    { nombre: 'Sucursales', descripcion: 'Encuentra nuestras sucursales.', url: '/sucursales' },
    { nombre: 'Reserva', descripcion: 'Gestiona tu reserva fácilmente.', url: '/reserva' },
    { nombre: 'Tarifas', descripcion: 'Consulta nuestras tarifas de renta.', url: '/empresa/tarifas' },
    { nombre: 'Políticas', descripcion: 'Conoce nuestras políticas de servicio.', url: '/empresa/politicas' },
    { nombre: 'Misión', descripcion: 'Nuestra filosofía y misión.', url: '/empresa/mision' },
    { nombre: 'Inicio', descripcion: 'Página principal.', url: '/' },
    { nombre: 'Login', descripcion: 'Accede a tu cuenta.', url: '/login' },
  ];


  onSearch() {
    if (this.searchTerm.trim() === '') {
      this.searchResults = [];
      return;
    }

    const lowerCaseTerm = this.searchTerm.toLowerCase();

    // Filtrar resultados que contengan la palabra clave
    this.searchResults = this.keywords.filter(item =>
      item.nombre.toLowerCase().includes(lowerCaseTerm) || 
      item.descripcion.toLowerCase().includes(lowerCaseTerm)
    );
  }

  
}
