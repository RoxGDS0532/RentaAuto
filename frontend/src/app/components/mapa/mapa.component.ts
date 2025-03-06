import { Component } from '@angular/core';
import { BreadcrumbsComponent } from "../../shared/breadcrumbs/breadcrumbs.component";
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [BreadcrumbsComponent, RouterModule, FooterComponent, NavbarComponent],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent {

}
