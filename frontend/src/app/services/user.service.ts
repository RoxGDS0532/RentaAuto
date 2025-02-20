import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environment/environment';
import { User } from '../../interfaces/user';

declare var grecaptcha: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/users';

  constructor(private http: HttpClient) {}

  signIn(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  login(user: User): Observable<string> {
    const recaptchaToken = grecaptcha.getResponse();

    if (!recaptchaToken) {
      return throwError('Por favor, verifica el reCAPTCHA');
    }

    const loginData = {
      ...user,
      recaptchaToken  // Añadir el token de reCAPTCHA al objeto de login
    };

    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`, loginData);
  }
}
