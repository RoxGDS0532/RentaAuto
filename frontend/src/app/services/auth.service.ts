import { Injectable, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';
  private timeout: any;

  constructor(private http: HttpClient, private router: Router) {
    this.resetSessionTimeout();
  }

  login(username: string, password: string, recaptchaToken: string): Observable<{ token: string } | null> {
    const body = { username, password, recaptchaToken };
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, body).pipe(
      tap(response => {
        if (response?.token) {
          localStorage.setItem('token', response.token);
          this.resetSessionTimeout();
        }
      }),
      catchError((error) => {
        console.error('Error en login:', error);
        return of(null);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    clearTimeout(this.timeout);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  isAuthenticated(): Observable<boolean> {
    return of(!!this.getToken()); // Devuelve `true` si hay un token almacenado
  }

  resetSessionTimeout(): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.logout();
    }, 30 * 60 * 1000);
  }

  @HostListener('window:mousemove') resetTimeout(): void {
    this.resetSessionTimeout();
  }

  @HostListener('window:keydown') resetTimeoutOnKey(): void {
    this.resetSessionTimeout();
  }
}
