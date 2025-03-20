import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { BreadcrumbsComponent } from "../../shared/breadcrumbs/breadcrumbs.component";

@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, BreadcrumbsComponent],
  templateUrl: './tarifas.component.html',
  styleUrl: './tarifas.component.css'
})
export class TarifasComponent {

}
