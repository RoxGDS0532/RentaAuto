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
  searchTerm: string = '';
  searchResults: { nombre: string; descripcion: string; url: string }[] = [];

  keywords = [
    { nombre: 'Autos Disponibles', descripcion: 'Consulta la lista de autos en renta.', url: '/auto' },
    { nombre: 'Sucursales', descripcion: 'Encuentra nuestras sucursales.', url: '/sucursales' },
    { nombre: 'Reserva', descripcion: 'Gestiona tu reserva fácilmente.', url: '/reserva' },
    { nombre: 'Tarifas', descripcion: 'Consulta nuestras tarifas de renta.', url: '/empresa/tarifas' },
    { nombre: 'Políticas', descripcion: 'Conoce nuestras políticas de servicio.', url: '/empresa/politicas' },
    { nombre: 'Misión', descripcion: 'Nuestra filosofía y misión.', url: '/empresa/mision' },
  ];
  constructor(private http: HttpClient,private router: Router, private searchService:SearchService) {}

  /*onSearch() {
    if (this.searchTerm.trim()) {
      this.searchService.buscar(this.searchTerm).subscribe(data => {
        this.searchResults = data.resultados; 
      });
    } else {
      this.searchResults = []; // Si no hay búsqueda, limpia los resultados
    }
  }*/

    onSearch() {
      if (this.searchTerm.trim() === '') {
        this.searchResults = [];
        return;
      }
  
      const lowerCaseTerm = this.searchTerm.toLowerCase(); 
      this.searchResults = this.keywords.filter(item =>
        item.nombre.toLowerCase().includes(lowerCaseTerm) || 
        item.descripcion.toLowerCase().includes(lowerCaseTerm)
      );
    }

}
