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


@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent, FormsModule, NavbarComponent],
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})


export class HomeUserComponent implements OnInit{
  sucursales: any[] = [];

  constructor(private lugarService: LugarService, private router: Router) {}

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
}
