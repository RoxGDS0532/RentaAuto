import { Component, OnInit } from '@angular/core';
import { AutosService } from '../../services/autos.service';
import { SucursalService } from '../../services/sucursal.service';
import { AutoModel, SucursalModel } from '../../models/datosModels';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ToastrService } from 'ngx-toastr';  // Importar correctamente el ToastrService

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent, FormsModule, NavbarComponent,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  autos: AutoModel[] = [];
  sucursales: SucursalModel[] = [];

  nuevoAuto: AutoModel = {
    marca: '', modelo: '', anio: 0, color: '', tipo: '',
    transmision: '', kilometraje: 0, estado: 'Disponible',
    tarifa_dia: 0, ubicacion: { ciudad: '', direccion: '' }, imagenes: []
  };

  nuevaSucursal: SucursalModel = {
    nombre: '',
    direccion: { calle: '', ciudad: '', pais: '' },
    contacto: { telefono: '', email: '' },
    autos_disponibles: []
  };

  constructor(
    private autosService: AutosService,
    private sucursalService: SucursalService,
    private toastr: ToastrService, // Inyectar ToastrService
  ) {}

  ngOnInit() {
    this.obtenerAutos();
    this.obtenerSucursales();
  }

  obtenerAutos() {
    this.autosService.getAutos().subscribe(
      (data: AutoModel[]) => {
        this.autos = data;
        this.toastr.success('Autos cargados con éxito');
      },
      error => {
        console.error('Error al obtener autos', error);
        this.toastr.error('Error al obtener autos');
      }
    );
  }

  obtenerSucursales() {
    this.sucursalService.getSucursales().subscribe(
      (data: SucursalModel[]) => {
        this.sucursales = data;
        this.toastr.success('Sucursales cargadas con éxito');
      },
      error => {
        console.error('Error al obtener sucursales', error);
        this.toastr.error('Error al obtener sucursales');
      }
    );
  }

  agregarAuto() {
    // Filtramos las URLs vacías antes de enviarlas al backend
    const imagenesValidas = this.nuevoAuto.imagenes.filter(url => url.trim() !== '');
    
    this.nuevoAuto.imagenes = imagenesValidas; // Actualizamos el campo de imágenes
  
    this.autosService.addAuto(this.nuevoAuto).subscribe(
      (auto: AutoModel) => {
        this.autos.push(auto);
        this.nuevoAuto = { marca: '', modelo: '', anio: 0, color: '', tipo: '', transmision: '', kilometraje: 0, estado: 'Disponible', tarifa_dia: 0, ubicacion: { ciudad: '', direccion: '' }, imagenes: [] };
        this.toastr.success('Auto agregado con éxito');
      },
      error => {
        console.error('Error al agregar auto', error);
        this.toastr.error('Error al agregar auto');
      }
    );
  }
  

  agregarSucursal() {
    this.sucursalService.addSucursal(this.nuevaSucursal).subscribe(
      (sucursal: SucursalModel) => {
        this.sucursales.push(sucursal);
        this.nuevaSucursal = { nombre: '', direccion: { calle: '', ciudad: '', pais: '' }, contacto: { telefono: '', email: '' }, autos_disponibles: [] };
        this.toastr.success('Sucursal agregada con éxito');
      },
      error => {
        console.error('Error al agregar sucursal', error);
        this.toastr.error('Error al agregar sucursal');
      }
    );
  }

  eliminarAuto(id: string) {
    this.autosService.deleteAuto(id).subscribe(
      () => {
        this.autos = this.autos.filter(auto => auto._id !== id);
        this.toastr.success('Auto eliminado con éxito');
      },
      error => {
        console.error('Error al eliminar auto', error);
        this.toastr.error('Error al eliminar auto');
      }
    );
  }

  eliminarSucursal(id: string) {
    this.sucursalService.deleteSucursal(id).subscribe(
      () => {
        this.sucursales = this.sucursales.filter(sucursal => sucursal.nombre !== id);
        this.toastr.success('Sucursal eliminada con éxito');
      },
      error => {
        console.error('Error al eliminar sucursal', error);
        this.toastr.error('Error al eliminar sucursal');
      }
    );
  }
}