import { Component } from '@angular/core';
import { BreadcrumbsComponent } from "../../shared/breadcrumbs/breadcrumbs.component";
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-promociones',
  standalone: true,
  imports: [BreadcrumbsComponent, FooterComponent, NavbarComponent],
  templateUrl: './promociones.component.html',
  styleUrl: './promociones.component.css'
})
export class PromocionesComponent {

}
