import { Component, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from "../../shared/breadcrumbs/breadcrumbs.component";
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { ReservaService } from 'src/app/services/reserva.service';
import { AutoModel, ReservaModel } from 'src/app/models/datosModels';
import { FormsModule, FormGroup, FormBuilder, Validators, AbstractControl,ReactiveFormsModule  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReservaCompletaService } from '../../services/reserva-completa.service';
import { DatePipe,CommonModule  } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-confi-reserva',
  standalone: true,
  imports: [BreadcrumbsComponent, FooterComponent, NavbarComponent,FormsModule,ReactiveFormsModule,CommonModule ],
  templateUrl: './confi-reserva.component.html',
  styleUrl: './confi-reserva.component.css',
  providers: [DatePipe], 

})
export class ConfiReservaComponent  implements OnInit{
  reservaForm: FormGroup;
  nuevaReserva: ReservaModel = new ReservaModel();
  reservaLugar$= this.reservaService.reserva$;
  selectedAuto$ = this.reservaService.selectedAuto$;
  imagenAuto: any=[]; 


  constructor(private fb: FormBuilder,private reservaService: ReservaService, private toastrService: ToastrService, private reservaCompletaService: ReservaCompletaService, private location: Location) {
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
      if (autoSeleccionado && this.reservaForm.value.fechaA && this.reservaForm.value.fechaD) {
        const fechaInicio = new Date(this.reservaForm.value.fechaA);
        const fechaFin = new Date(this.reservaForm.value.fechaD);
        const diasRenta = Math.ceil((fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24)); 
  
        this.reservaForm.patchValue({
          vehiculo: autoSeleccionado.modelo,
          total: autoSeleccionado.tarifa_dia,
          costo_total: diasRenta * autoSeleccionado.tarifa_dia 
        });
        this.imagenAuto = autoSeleccionado.imagenes?.length > 0 ? autoSeleccionado.imagenes : ['URL_DEFAULT'];
      }
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
            this.toastrService.success('Reserva creada con éxito')
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
  
  regresar(): void {
    this.location.back();
  }



}

