import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { BreadcrumbsComponent } from "../../shared/breadcrumbs/breadcrumbs.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [NavbarComponent, BreadcrumbsComponent, FooterComponent],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.css'
})
export class EmpresaComponent {

}
