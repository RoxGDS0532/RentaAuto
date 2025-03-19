import { Component } from '@angular/core';
import { BreadcrumbsComponent } from "../../shared/breadcrumbs/breadcrumbs.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { ReservaModel } from 'src/app/models/datosModels';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservaCompletaService } from 'src/app/services/reserva-completa.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [BreadcrumbsComponent, NavbarComponent, FooterComponent,CommonModule, ReactiveFormsModule ],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {
  reservaEncontrada: ReservaModel;
  reservaForm: FormGroup;
  mostrarForm = false;
  
   constructor(private reservaCompletaService: ReservaCompletaService,private toastrService:ToastrService,private fb: FormBuilder,private sanitizer: DomSanitizer) { 
    this.reservaEncontrada = new ReservaModel();
    this.reservaForm = this.fb.group({
      _id: [null],
      cliente: ['', Validators.required],
      edad: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      lugarS: ['', Validators.required],
      fechasS: ['', Validators.required],
      horasS: ['', Validators.required],
      fechasE: ['', Validators.required],
      horasE: ['', Validators.required],
      lugarE: ['', Validators.required],
      estatusR: ['', Validators.required],
      total: ['', Validators.required],
      vehiculo: ['', Validators.required],
      license: [''], 
      identification: ['']
    });
   }
   ngOnInit(): void {
   }

   obtenReserva(idReserva: string) {
     this.reservaCompletaService.getReservaById(idReserva).subscribe(
       (reserva: ReservaModel) => {
         this.reservaEncontrada = reserva;
         console.log('Reserva encontrada:', this.reservaEncontrada);
       },
     (error) => {
         console.error('Error al obtener reserva:', error);
         this.toastrService.error('Reserva no encontrada. Verifica tus datos', 'Error');
       }
     );
   }
   
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

   
  cancelarReserva(id: string | undefined): void {
    if (id) {
      this.reservaCompletaService.deleteReserva(id).subscribe(
        data => {
          console.log('Reserva Cancelada:', data);
          this.toastrService.success('Su reserva a sido cancelada', 'Aviso');
        },
        error => {
          console.error('No se logro cancelar su Reserva:', error);
          this.toastrService.error('No se logro cancelar su Reserva', 'Error');
        }
      );
    }
  }
   
  
  modificarReserva(reserva: ReservaModel): void {
    this.reservaForm.patchValue(reserva);
    console.log(reserva);
  }

  actualizarReserva(): void {
    if (this.reservaForm.valid) {
      this.reservaCompletaService.updateReserva(this.reservaForm.value).subscribe(
        () => {
          this.reservaForm.reset();
          this.toastrService.success('Reserva actualizada correctamente', 'Aviso');
        },
        error => {
          console.error('Error al actualizar Reserva:', error);
          this.toastrService.error('Error al actualizar la reserva  ', 'Error');
        }
      );
    }
  }

  mostrarFormulario(): void {
    this.mostrarForm = true;
    this.reservaForm.patchValue(this.reservaEncontrada);
  }
  cancelarEdicion(): void {
    this.mostrarForm = false;
  }
}