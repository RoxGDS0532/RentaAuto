import { Component, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from "../../shared/breadcrumbs/breadcrumbs.component";
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { ReservaService } from 'src/app/services/reserva.service';
import { AutoModel, ReservaModel } from 'src/app/models/datosModels';
import { FormsModule, FormGroup, FormBuilder, Validators, AbstractControl,ReactiveFormsModule  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReservaCompletaService } from '../../services/reserva-completa.service';
@Component({
  selector: 'app-confi-reserva',
  standalone: true,
  imports: [BreadcrumbsComponent, FooterComponent, NavbarComponent,FormsModule,ReactiveFormsModule ],
  templateUrl: './confi-reserva.component.html',
  styleUrl: './confi-reserva.component.css'
})
export class ConfiReservaComponent  implements OnInit{
  reservaForm: FormGroup;
  nuevaReserva: ReservaModel = new ReservaModel();
  reservaLugar$= this.reservaService.reserva$;
  selectedAuto$ = this.reservaService.selectedAuto$;

  constructor(private fb: FormBuilder,private reservaService: ReservaService, private toastrService: ToastrService, private reservaCompletaService: ReservaCompletaService) {
    this.reservaForm = this.fb.group({
      cliente: ['', Validators.required], 
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      sucursalA: [''],
      fechaA: [''],
      horaA: [''],
      sucursalD: [''],
      fechaD: [''],
      horaD: [''],
      estado: [''],
      costo_total: [],
      vehiculo: [''],
    });
    
  }


  ngOnInit() {
    this.reservaLugar$.subscribe(reservaLugar => {
      this.reservaForm.patchValue(reservaLugar);
    });

    this.selectedAuto$.subscribe(autoSeleccionado => {
      this.reservaForm.patchValue({
        vehiculo: autoSeleccionado.modelo,
        total: autoSeleccionado.tarifa_dia 
      });
    });
  }
  agregarReserva() {
    console.log("Datos antes de enviar:", this.reservaForm.value);
  
    if (this.reservaForm.valid) {
      this.nuevaReserva = this.reservaForm.value;  // Asigna correctamente
      console.log('Datos de la reserva:', this.nuevaReserva);
  
      this.reservaCompletaService.addReserva(this.nuevaReserva)
        .subscribe(
          (reserva: ReservaModel) => {
            console.log('Reserva creada:', reserva);
          },
          error => {
            console.error('Error al crear la reserva:', error);
            this.toastrService.error('Error al crear la reserva:', 'Error');
          }
        );
    } else {
      console.error('Datos de reserva inválidos');
      this.toastrService.error('Datos de reserva inválidos', 'Error');
    }
  }
  
  
  
  onClick(reserva: ReservaModel): void {
    console.log('Reserva enviada:', reserva);
    this.reservaService.setReservaCompleta(reserva);
  }
  
}
