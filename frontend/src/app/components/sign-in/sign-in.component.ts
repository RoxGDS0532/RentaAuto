import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { Usuario } from 'src/interfaces/usuario';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, CommonModule, SpinnerComponent, FooterComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',

})


export class SignInComponent implements OnInit {


  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  nombre: string = '';
  apellido: string = '';
  correoElectronico: string = '';
  NumeroTelefono:string='';
  loading: boolean = false;

 


  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService) { }

  ngOnInit(): void {
  }

  addUser() {

    // Validamos que el usuario ingrese valores
    if (this.username == '' || this.password == '' || this.confirmPassword == '' ||this.nombre == '' || this.apellido== '' ||  this.correoElectronico == '' || this.NumeroTelefono=='') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    
    // Validamos que las password sean iguales
    if (this.password != this.confirmPassword) {
      this.toastr.error('Las passwords ingresadas son distintas', 'Error');
      return;
    }

    // Creamos el objeto
    const user: Usuario = {
      username: this.username,
      password: this.password,
      Nombre: this.nombre ,
      Apellido: this.apellido ,
      CorreoElectronico: this.correoElectronico ,
      NumeroTelefono:this.NumeroTelefono

      
    }

    this.loading = true;
    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(`El usuario ${this.username} fue registrado con exito`, 'Usuario registrado');
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
      }
    })
  }
}
