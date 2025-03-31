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
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent, FormsModule, NavbarComponent],
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})


export class HomeUserComponent implements OnInit{
  sucursales: any[] = [];
  sucursalA: any = {};
  fechaA: string = "";
  horaA: string = "";
  sucursalD: any = {};  
  fechaD: string = "";
  horaD: string = "";
  fechaHoy: string = "";

sucursalAInvalida: boolean = false;
sucursalDInvalida: boolean = false;
fechaAInvalida: boolean = false;
fechaDInvalida: boolean = false;
horaAInvalida: boolean = false;
horaDInvalida: boolean = false;

  constructor(private lugarService: LugarService, private router: Router, private reservaService: ReservaService, private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.cargarSucursales();
    this.setMinDate();
  }

  setMinDate(): void {
    const today = new Date();
    this.fechaHoy = today.toISOString().split('T')[0]; 
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
    this.sucursalAInvalida = !this.sucursalA || !this.sucursalA.nombre;
    this.sucursalDInvalida = !this.sucursalD || !this.sucursalD.nombre;
    this.fechaAInvalida = !this.fechaA;
    this.fechaDInvalida = !this.fechaD;
    this.horaAInvalida = !this.horaA;
    this.horaDInvalida = !this.horaD;
  
    if (this.sucursalAInvalida || this.sucursalDInvalida || this.fechaAInvalida || this.fechaDInvalida || this.horaAInvalida || this.horaDInvalida) {
      return; // No continúa si hay errores
    }

    const reserva: ReservaLugarModel = {
      sucursalA: this.sucursalA.nombre,
      fechaA: new Date(this.fechaA),
      horaA: this.horaA,
      sucursalD: this.sucursalD.nombre,
      fechaD: new Date(this.fechaD),
      horaD: this.horaD,
    };
  
    this.reservaService.setReserva(reserva);
    console.log('Reserva enviada:', reserva);
    this.router.navigate(['/auto']); 
  }
  
  
}
