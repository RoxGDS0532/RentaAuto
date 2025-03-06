import { Component } from '@angular/core';
import { BreadcrumbsComponent } from "../../shared/breadcrumbs/breadcrumbs.component";
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-confi-reserva',
  standalone: true,
  imports: [BreadcrumbsComponent, FooterComponent, NavbarComponent],
  templateUrl: './confi-reserva.component.html',
  styleUrl: './confi-reserva.component.css'
})
export class ConfiReservaComponent {

}
