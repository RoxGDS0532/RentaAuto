import { Component } from '@angular/core';
import { BreadcrumbsComponent } from "../../shared/breadcrumbs/breadcrumbs.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-confi-reserva',
  standalone: true,
  imports: [BreadcrumbsComponent, FooterComponent],
  templateUrl: './confi-reserva.component.html',
  styleUrl: './confi-reserva.component.css'
})
export class ConfiReservaComponent {

}
