import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { AutoModel } from '../models/datosModels';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutosService {
  private domain = 'http://localhost:3000';  // Asegúrate de que esta URL esté correcta

  constructor(private http: HttpClient) { }

  // Obtener los autos, con opción de filtrar por categoría
  getAutos(categoria: string = '') {
    return this.http.get<AutoModel[]>(`${this.domain}/api/auto?categoria=${categoria}`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getAutosById(id: string) {
      return this.http.get<AutoModel>(`${this.domain}/api/auto/${id}`).pipe(
        catchError(this.handleError)
      );
    }

  // Actualizar la cantidad de autos
  updateCantidadAuto(autoId: string, cantidad: number) {
    return this.http.put(`${this.domain}/api/auto/${autoId}`, { cantidad }).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  // Agregar un nuevo auto
  addAuto(newAuto: AutoModel) {
    return this.http.post<AutoModel>(`${this.domain}/api/auto`, newAuto).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  // Eliminar un auto
  deleteAuto(id: string) {
    return this.http.delete<AutoModel>(`${this.domain}/api/auto/${id}`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  // Actualizar un auto
  updateAuto(newReserva: AutoModel) {
    return this.http.put(`${this.domain}/api/auto/${newReserva._id}`, newReserva).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMessage = 'Algo salió mal, por favor intente más tarde.';
  
    if (error instanceof HttpErrorResponse) {
      // Si el error es de tipo HttpErrorResponse
      try {
        if (error.error instanceof ProgressEvent) {
          // Si el error no es JSON (por ejemplo, texto plano)
          errorMessage = 'Error del servidor: ' + error.message;
        } else {
          // Intentar parsear el error como JSON
          errorMessage = error.error?.message || 'Ocurrió un error en el servidor.';
        }
      } catch (e) {
        // Si la respuesta no es JSON válido, manejar el error
        errorMessage = 'Respuesta no válida del servidor: ' + error.message;
      }
    }
  
    // Muestra el error en consola y en el UI
    console.error('Se produjo un error:', error);
    return throwError(() => new Error(errorMessage));
  }
  



}
