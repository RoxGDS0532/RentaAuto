import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { LugarService } from '../../services/lugar.service';
import { Router } from '@angular/router';
import { BreadcrumbsComponent } from '../../shared/breadcrumbs/breadcrumbs.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { ReservaService } from 'src/app/services/reserva.service';
import { ReservaLugarModel } from 'src/app/models/datosModels';


@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent, FormsModule, NavbarComponent],
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})


export class HomeUserComponent implements OnInit{
  sucursales: any[] = [];
  sucursalA: string = "";
  fechaA: string = "";
  horaA: string = "";
  sucursalD: string = "";
  fechaD: string = "";
  horaD: string = "";

  constructor(private lugarService: LugarService, private router: Router, private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.cargarSucursales();
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  cargarSucursales(): void {
    this.lugarService.getSucursales().subscribe(
      (data:any) => {
        this.sucursales = data;
      },
      (error:any) => {
        console.error('Error al obtener sucursales', error);
      }
    );  
  }

  onClick(): void {
    const reserva: ReservaLugarModel = {
      sucursalA: this.sucursalA,
      fechaA: new Date(this.fechaA),
      horaA: this.horaA,
      sucursalD: this.sucursalD,
      fechaD: new Date(this.fechaD),
      horaD: this.horaD,
    };
  
    this.reservaService.setReserva(reserva);
    console.log('Reserva enviada:', reserva);
    this.router.navigate(['/auto']); // Navega al siguiente paso (selección de auto)
  }
  
  
}
