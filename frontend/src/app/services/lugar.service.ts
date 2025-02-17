import { inject, Injectable } from '@angular/core';
import { LugarModel  } from '../models/datosModels';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LugarService {

  private domain: string = "http://localhost:3000"; 
  
  constructor(private http: HttpClient) { }

  getSucursales() : Observable<any[]> {
    return this.http.get<LugarModel[]>(`${this.domain}/api/sucursal`)
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
