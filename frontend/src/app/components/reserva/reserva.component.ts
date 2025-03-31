import { Component } from '@angular/core';
import { BreadcrumbsComponent } from "../../shared/breadcrumbs/breadcrumbs.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { AutoModel, ReservaModel } from 'src/app/models/datosModels';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservaCompletaService } from 'src/app/services/reserva-completa.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LugarService } from '../../services/lugar.service';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AutosService } from '../../services/autos.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [BreadcrumbsComponent, NavbarComponent, FooterComponent,CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {
  reservaEncontrada: ReservaModel;
  reservaForm: FormGroup;
  mostrarForm = false;
  sucursales: any[] = [];
  sucursalD: any = {};  
  sucursalA: any = {};



  
   constructor(private reservaCompletaService: ReservaCompletaService,private toastrService:ToastrService,private fb: FormBuilder,private sanitizer: DomSanitizer, private lugarService:LugarService,   private route: ActivatedRoute, private datePipe: DatePipe, private autosService:AutosService
   ) { 
    this.reservaEncontrada = new ReservaModel();
    this.reservaForm = this.fb.group({
      cliente: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      vehiculo: ['', Validators.required],
      sucursalA: ['', Validators.required],
      sucursalD: ['', Validators.required],
      fechaA: ['', Validators.required],
      horaA: ['', Validators.required],
      fechaD: ['', Validators.required],
      horaD: ['', Validators.required]
    });
   }
   ngOnInit(): void {
    this.cargarSucursales();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenReserva(id);
    }
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
      // Obtenemos las fechas del formulario
      const fechaA: string | null = this.reservaForm.value.fechaA;
      const fechaD: string | null = this.reservaForm.value.fechaD;
  
      // Verificamos que las fechas no sean null o undefined
      if (!fechaA || !fechaD) {
        this.toastrService.error('Las fechas son obligatorias', 'Error');
        return;
      }
  
      // Convertimos las fechas de string a Date
      const fechaAObj: Date = new Date(fechaA);
      const fechaDObj: Date = new Date(fechaD);
  
      // Verificamos que las fechas sean válidas
      if (isNaN(fechaAObj.getTime()) || isNaN(fechaDObj.getTime())) {
        this.toastrService.error('Las fechas no son válidas', 'Error');
        return;
      }
  
      // Calculamos los días de diferencia entre fechaA y fechaD
      const diffTime = fechaDObj.getTime() - fechaAObj.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24); // Convertir de milisegundos a días
  
      // Obtenemos la tarifa diaria del vehículo
      //const tarifaPorDia = this.reservaEncontrada.vehiculo.tarifaPorDia; // Asumiendo que tienes este dato en la reserva
  
      // Calculamos el costo total
      //const costoTotal = diffDays * tarifaPorDia;
  
      // Creamos un objeto de reserva actualizado con los nuevos valores
      const updatedReserva: ReservaModel = {
        ...this.reservaEncontrada,
        sucursalA: this.reservaForm.value.sucursalA.nombre,
        sucursalD: this.reservaForm.value.sucursalD.nombre,
        fechaA: fechaAObj, // Asignamos el objeto Date
        fechaD: fechaDObj, // Asignamos el objeto Date
        costo_total: 58 // Asignamos el costo calculado
      };
  
      // Realizamos la actualización de la reserva
      this.reservaCompletaService.updateReserva(updatedReserva).subscribe(reserva => {
        alert('Reserva actualizada con éxito!');
        this.reservaEncontrada = reserva;
        this.mostrarForm = false;  // Ocultar el formulario después de la actualización
      });
    } else {
      this.toastrService.error('No se logró actualizar su Reserva', 'Error');
    }
  }
  
  
  
  
  



  mostrarFormulario(): void {
    this.mostrarForm = true;
    this.reservaForm.patchValue(this.reservaEncontrada);
  }
  cancelarEdicion(): void {
    this.mostrarForm = false;
  }

  cargarSucursales(): void {
    this.lugarService.getSucursales().subscribe(
      (data:any) => {
        this.sucursales = data;
      },
      (error:any) => {
        console.error('Error al obtener sucursales', error);
      }
    );  
  }
}

