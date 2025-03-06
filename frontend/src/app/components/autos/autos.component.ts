import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AutoModel } from 'src/app/models/datosModels';
import { AutosService } from 'src/app/services/autos.service';
import { LugarService } from 'src/app/services/lugar.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbsComponent } from "../../shared/breadcrumbs/breadcrumbs.component";
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { ErrorService } from 'src/app/services/error.service'; // Importa tu servicio de errores

@Component({
  selector: 'app-autos',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, BreadcrumbsComponent, RouterModule, FooterComponent, NavbarComponent],
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
    private lugarService: LugarService,
    private breadcrumbService: BreadcrumbService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService // Inyecta el servicio de error
  ) {}

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
        if (error.status === 500) {
          this.router.navigate(['/error500']); // Redirige al componente Error500 si es un error 500
        } else {
          this.errorService.msjError(error); // Si es otro tipo de error, muestra el mensaje correspondiente
        }
      }
    );
  }

  filtrarPorCategoria(categoria: string) {
    console.log('Categoria seleccionada:', categoria);  // Verifica la categoría seleccionada
  
    // Simulación de error 500 para categorías específicas
    if (categoria === 'Económico') {
      // Simula un error 500
      this.errorSimulado500();
    } else {
      this.autosService.getAutos(categoria).subscribe(
        data => {
          this.autosFiltrados = data;
        },
        error => {
          console.error('Error al filtrar autos por categoría:', error);
          if (error.status === 500) {
            this.router.navigate(['/error500']); // Redirige a la página de error 500
          } else {
            this.errorService.msjError(error); // Otro tipo de error
          }
        }
      );
    }
  }
  
  // Función para simular el error 500
  errorSimulado500() {
    console.error('Error 500: Internal Server Error');
    this.router.navigate(['/error500']); // Redirige a la página de error 500
  }
  
  

  cargarLugares(): void {
    this.lugarService.getSucursales().subscribe(
      data => {
        this.lugares = data;
        console.log('Lugares cargados:', this.lugares);
      },
      error => {
        console.error('Error al cargar lugares:', error);
        if (error.status === 500) {
          this.router.navigate(['/error500']);
        } else {
          this.errorService.msjError(error);
        }
      }
    );
  }
}
