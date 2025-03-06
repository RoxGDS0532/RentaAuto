import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = "http://localhost:3000"; 

  constructor(private http: HttpClient) { }
  buscar(query: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/buscar?query=${query}`);
  }
}
