import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { ReservaModel } from '../models/datosModels';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservaCompletaService {
  private domain: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getReservas() {
    return this.http.get<ReservaModel[]>(`${this.domain}/api/Reserva`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  addReserva(newReserva: ReservaModel) {
    return this.http.post<ReservaModel>(`${this.domain}/api/Reserva`, newReserva, {
        headers: { 'Content-Type': 'application/json' }
    }).pipe(
        map(res => res),
        catchError(this.handleError)
    );
}


  deleteReserva(id: string) {
    return this.http.delete<ReservaModel>(`${this.domain}/api/Reserva/${id}`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getReservaById(id: string) {
    return this.http.get<ReservaModel>(`${this.domain}/api/Reserva/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateReserva(newReserva: ReservaModel) {
    return this.http.put(`${this.domain}/api/Reserva/${newReserva._id}`, newReserva).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }
}
