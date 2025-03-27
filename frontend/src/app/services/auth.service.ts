import { Injectable, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://tu-api.com/auth'; // Reemplaza con tu API real
  private timeout: any;

  constructor(private http: HttpClient, private router: Router) {
    this.resetSessionTimeout();
  }

  login(username: string, password: string): Observable<{ token: string } | null> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.resetSessionTimeout();
        }
      }),
      catchError(() => of(null))  // En caso de error, retorna null
    );
  }
  
  
  

  logout(): void {
    localStorage.removeItem('token');
    clearTimeout(this.timeout);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): Observable<boolean> {
    const token = this.getToken();
    return of(token ? !this.isTokenExpired(token) : false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch (e) {
      return true;
    }
  }
  

  resetSessionTimeout(): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.logout();
    }, 30 * 60 * 1000); // 30 minutos
  }

  @HostListener('window:mousemove') resetTimeout(): void {
    this.resetSessionTimeout();
  }

  @HostListener('window:keydown') resetTimeoutOnKey(): void {
    this.resetSessionTimeout();
  }
}
