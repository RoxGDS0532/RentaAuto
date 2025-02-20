import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AutoModel } from 'src/app/models/datosModels';
import { AutosService } from 'src/app/services/autos.service';
import { LugarService } from 'src/app/services/lugar.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbsComponent } from "../../shared/breadcrumbs/breadcrumbs.component";
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-autos',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, BreadcrumbsComponent,RouterModule],
  templateUrl: './autos.component.html',
  styleUrl: './autos.component.css'
})
export class AutosComponent {
  auto: AutoModel[] = [];
  autosFiltrados: AutoModel[] = [];
  lugares: any[] = [];
  breadcrumbs$ = this.breadcrumbService.breadcrumbs$;

  constructor(
      private autosService: AutosService,
      private lugarService:LugarService,
      private breadcrumbService: BreadcrumbService
    ) {
}

  ngOnInit(): void {
    this.obtenerDatosAutos();
    this.cargarLugares();
  }

  obtenerDatosAutos() {
    this.autosService.getAutos().subscribe(
      data => {
        this.auto = data;
        this.autosFiltrados = [...this.auto];
        console.log('Autos cargados:', this.auto);
      },
      error => {
        console.error('Error al cargar datos de autos:', error);
      }
    );
  }
  filtrarPorCategoria(categoria: string) {
    this.autosFiltrados = this.auto.filter(auto => auto.categoria === categoria);
  }

  cargarLugares(): void {
    this.lugarService.getSucursales().subscribe(
      data => {
        this.lugares = data;
        console.log('Lugares cargados:', this.lugares);
      },
      error => {
        console.error('Error al cargar lugares:', error);
      }
    );
  }
  
  
}


