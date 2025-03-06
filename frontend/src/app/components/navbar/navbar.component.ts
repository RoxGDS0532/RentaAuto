import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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

  constructor(private http: HttpClient,private router: Router, private searchService:SearchService) {}

  onSearch() {
    if (this.searchTerm.trim()) {
      this.searchService.buscar(this.searchTerm).subscribe(data => {
        this.searchResults = data.resultados; // Los resultados de la búsqueda
      });
    } else {
      this.searchResults = []; // Si no hay búsqueda, limpia los resultados
    }
  }

  // Redirigir según la sugerencia seleccionada
  redirect(sugerencia: any) {
    if (sugerencia.mensaje === 'Autos Disponibles') {
      this.router.navigate(['/auto']);
    } else if (sugerencia.mensaje === 'Sucursales') {
      this.router.navigate(['/sucursal']);
    }
    // Agrega otras redirecciones que necesites
  }

}
