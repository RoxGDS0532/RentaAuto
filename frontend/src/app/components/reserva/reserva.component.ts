import { Component } from '@angular/core';
import { BreadcrumbsComponent } from "../../shared/breadcrumbs/breadcrumbs.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { ReservaModel } from 'src/app/models/datosModels';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservaCompletaService } from 'src/app/services/reserva-completa.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LugarService } from '../../services/lugar.service';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';


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



  
   constructor(private reservaCompletaService: ReservaCompletaService,private toastrService:ToastrService,private fb: FormBuilder,private sanitizer: DomSanitizer, private lugarService:LugarService,   private route: ActivatedRoute
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
      (error) => {  // Aquí se cierra el primer bloque de subscribe correctamente
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
      const updatedReserva: ReservaModel = { ...this.reservaEncontrada, ...this.reservaForm.value };
      this.reservaCompletaService.updateReserva(updatedReserva).subscribe(reserva => {
        this.toastrService.success('Reserva actualizada con éxito', 'Aviso');
        this.reservaEncontrada = reserva;
        this.mostrarForm = false;
      });
    } else {
      this.toastrService.error('No se logro actualizar su Reserva', 'Error');
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

