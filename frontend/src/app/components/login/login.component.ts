import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule,FormsModule } from '@angular/forms';
import { User } from 'src/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { CommonModule } from '@angular/common';
import { UserglobalService } from 'src/app/services/userglobal.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
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
    CommonModule,
    SpinnerComponent,
    NgxCaptchaModule,
    ToastrModule,
    BreadcrumbsComponent,
    FormsModule,
    FooterComponent
],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading: boolean = false;
  isBrowser: boolean;
  siteKey: string = '6Lcdg90qAAAAAE80uDMWIVZ6Z6c9J0zhq8HpxJGJ'; // Tu clave de sitio reCAPTCHA
  searchTerm: string = '';
  searchResults: { nombre: string; descripcion: string; url: string }[] = [];


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private usergo: UserglobalService,
    private formBuilder: FormBuilder,
    
  ) { 
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      console.warn('Recaptcha no se ejecuta en el servidor.');
    }
    this.initForm();
  }

  // Inicializa el formulario con los campos y validaciones
  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      recaptcha: ['', Validators.required] // Campo para el reCAPTCHA
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.toastr.error('Por favor, complete todos los campos', 'Error');
      return;
    }

    const { username, password, recaptcha } = this.loginForm.value;
    const user: User = { username, password };

    this.loading = true;
    this.toastr.info('Iniciando sesión...', 'Cargando');
      // Mensaje informativo

    this._userService.login(user).subscribe({
      next: (token) => {
        console.log(token);  // Verifica lo que está devolviendo la API

        if (token) {
          localStorage.setItem('token', token);
          this.usergo.setUserName(username);

          // Mostrar la notificación de éxito
          this.toastr.success('Inicio de sesión exitoso', 'Bienvenido!');

          // Redirige a la página deseada
          this.router.navigate(['/']);
        } else {
          this.toastr.error('No se recibió token', 'Error');
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error de login', error); // Verifica el error completo
        if (error.status === 404) {
          this.toastr.error('El usuario no existe', 'Error');
        } else if (error.status === 400) {
          this.toastr.error('Usuario o contraseña incorrectos', 'Error');
        } else {
          this.toastr.error('Ocurrió un error inesperado', 'Error');
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