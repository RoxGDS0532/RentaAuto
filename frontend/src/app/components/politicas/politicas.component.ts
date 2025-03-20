import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { BreadcrumbsComponent } from "../../shared/breadcrumbs/breadcrumbs.component";

@Component({
  selector: 'app-politicas',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, BreadcrumbsComponent],
  templateUrl: './politicas.component.html',
  styleUrl: './politicas.component.css'
})
export class PoliticasComponent {

}
