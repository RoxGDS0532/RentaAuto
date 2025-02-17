import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/interfaces/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API_URI}/usuario`);
  }

  getUsuario(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_URI}/usuario/${id}`);
  }

  deleteUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.API_URI}/usuario/${id}`);
  }

  saveUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API_URI}/usuario`, usuario);
  }

  updateNombre(id: string, nombre: string): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API_URI}/usuario/${id}`, nombre);
  }

  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API_URI}/usuario/${id}`, usuario);
  }

  // Nuevo método para obtener un usuario por nombre de usuario
  getUserByUsername(username: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_URI}/usuario?username=${username}`);
  }
}
