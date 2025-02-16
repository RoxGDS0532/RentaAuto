import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LugarModel  } from '../models/datosModels';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  private domain: string = "http://localhost:3000"; 

  constructor(private http: HttpClient) { }

  getLugars() {
    return this.http.get<LugarModel[]>(`${this.domain}/api/Lugar`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  addLugar(newLugar: LugarModel) {
    return this.http.post<LugarModel>(`${this.domain}/api/Lugar`, newLugar).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  deleteLugar(id: string) {
    return this.http.delete<LugarModel>(`${this.domain}/api/Lugar/${id}`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }


  updateLugar(newDatosP: LugarModel) {
    return this.http.put(`${this.domain}/api/Lugar/${newDatosP._id}`, newDatosP).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }
  handleError(handleError: any): any {
    throw new Error('Method not implemented.');
  }
}
