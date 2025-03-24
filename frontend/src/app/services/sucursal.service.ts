import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SucursalModel } from '../models/datosModels';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  private apiUrl = 'http://localhost:3000/api/sucursal';

  constructor(private http: HttpClient) {}

  getSucursales(): Observable<SucursalModel[]> {
    return this.http.get<SucursalModel[]>(this.apiUrl);
  }

  addSucursal(sucursal: SucursalModel): Observable<SucursalModel> {
    return this.http.post<SucursalModel>(this.apiUrl, sucursal);
  }

  deleteSucursal(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
