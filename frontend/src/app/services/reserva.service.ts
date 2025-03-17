import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AutoModel, ReservaLugarModel, ReservaModel } from '../models/datosModels';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
 private auto$ = new BehaviorSubject<AutoModel>(iniAuto);
 private reservaLugar$ = new BehaviorSubject<ReservaLugarModel>(initLugarR);
 private reservaComp$ = new BehaviorSubject<ReservaModel>(initReserva);

  constructor() {}

  get selectedAuto$(): Observable<AutoModel>{
    return this.auto$.asObservable();
   }
   get reserva$(): Observable<ReservaLugarModel>{
    return this.reservaLugar$.asObservable();
   }
  
   get reservaCompleta$(): Observable<ReservaModel>{
    return this.reservaComp$.asObservable();
   }
  
   setReserva(reserva:ReservaLugarModel): void{
    this.reservaLugar$.next(reserva);
   }
  
   setReservaCompleta(reservaCompleta:ReservaModel): void{
    this.reservaComp$.next(reservaCompleta);
   }
  
   setAuto(auto: AutoModel): void {
    this.auto$.next(auto);
   }
  
  }
  
  const initLugarR: ReservaLugarModel = {
    sucursalA: '',
    fechaA: new Date(),
    horaA: '',
    fechaD: new Date(),
    horaD: '',
    sucursalD: '',
   };
  
   const initReserva: ReservaModel = {
  _id: '',
  cliente: '',
  sucursalA: '',
  fechaA: new Date(),
  horaA: '',
  sucursalD: '',
  fechaD: new Date(),
  horaD: '',
  estado: '',
  costo_total: 0,
  vehiculo: '',
   };
  
   const iniAuto: AutoModel = {
    _id: '',
    ubicacion:{
      ciudad: '',
      direccion:'',
    },
    marca: '',
    modelo: '',
    anio: 0,
    color: '',
    tipo: '',
    transmision: '',
    kilometraje: 0,
    estado: '',
    tarifa_dia: 0,
    imagenes: [],
    cantVehiculos: 0  
   };

