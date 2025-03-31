import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';
  private timeout: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string, recaptchaToken: string): Observable<{ token: string } | null> {
    const body = { username, password, recaptchaToken };
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, body).pipe(
      tap(response => {
        if (response?.token) {
          this.setToken(response.token);
        }
      }),
      catchError((error) => {
        console.error('Error en login:', error);
        return of(null);
      })
    );
  }

  forgotPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, data);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.resetSessionTimeout();
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
    return of(!!this.getToken());
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded?.role || null;
    }
    return null;
  }

  getUserName(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded?.username || null;
    }
    return null;
  }


  private resetSessionTimeout(): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.logout();
    }, 1 * 60 * 1000); 
  }
}
