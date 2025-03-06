import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = "http://localhost:3000"; 

  constructor(private http: HttpClient) { }
  search(query: string): Observable<any> {
    const params = new HttpParams().set('q', query); 
    return this.http.get<any>(this.apiUrl, { params });
  }
}
