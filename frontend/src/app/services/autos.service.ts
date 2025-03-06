import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { AutoModel } from '../models/datosModels';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutosService {
  private domain = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  

  getAutos(categoria: string = '') {
    return this.http.get<AutoModel[]>(`${this.domain}/api/auto?categoria=${categoria}`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }
  

  updateCantidadAuto(autoId: string, cantidad: number) {
    return this.http.put(`${this.domain}/api/auto/${autoId}`, { cantidad }).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  addAuto(newAuto: AutoModel) {
    return this.http.post<AutoModel>(`${this.domain}/api/auto`, newAuto).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  deleteAuto(id: string) {
    return this.http.delete<AutoModel>(`${this.domain}/api/auto/${id}`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  updateAuto(newReserva: AutoModel) {
    return this.http.put(`${this.domain}/api/auto/${newReserva._id}`, newReserva).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }
}


