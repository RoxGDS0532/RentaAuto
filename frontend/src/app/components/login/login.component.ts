import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { User } from 'src/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { CommonModule } from '@angular/common';
import { UserglobalService } from 'src/app/services/userglobal.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',


})

export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private usergo: UserglobalService,
    
  ) { }

  ngOnInit(): void {
  }

  login() {
    // Validaciones...
    const user: User = {
      username: this.username,
      password: this.password,
    }

    

    this.loading = true;

    this._userService.login(user).subscribe({
      next: (token) => {
        localStorage.setItem('token', token);

        this.usergo.setUserName(this.username);
        console.log('Nombre de usuario:', this.username);
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.toastr.error('El usuario no existe', 'Error');
        } else {
          this.toastr.error('Ocurrió un error inesperado', 'Error');
        }
        this.loading = false;
      }
    });
  }


  signOut(): void {
    this.signOut();
  }
}
