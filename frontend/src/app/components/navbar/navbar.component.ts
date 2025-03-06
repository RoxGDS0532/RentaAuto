import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchTerm: string = '';  // Para enlazar con el input de búsqueda
  searchResults: any[] = [];  // Para almacenar los resultados de la búsqueda

  constructor(private http: HttpClient) {}

  // Método para manejar la búsqueda
  onSearch() {
    if (this.searchTerm.trim() === '') {
      this.searchResults = [];
      return;
    }

    this.http.get<any[]>(`http://localhost:3000/api/buscar?query=${this.searchTerm}`)
      .subscribe(results => {
        this.searchResults = results;
      }, error => {
        console.error('Error en la búsqueda:', error);
      });
  }

}
