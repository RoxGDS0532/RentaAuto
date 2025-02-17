export class DatosPModel {
    _id?: string;
    nombre: string="";
}
export class EstadoModel {
  _id?: string;
  nombre: string = "";
  pais: string = "";
  estado: string = ""; 
}


export class LugarModel {
    _id?: string;
    nombre: string = "";
    direccion: string = "";
    pais: string = "";
    ciudad: string = "";
    Estado: string = ""; 
  }

export class CuidadModel {
    _id?: string;
    nombre: string="";
    pais: string="";

}
export class ReservaModel {
    _id?: string;
    cliente: string = "";
    edad: number = 0;
    correo: string = "";
    telefono: number = 0;
    lugarS: string = "";
    fechasS: Date = new Date();
    horasS: string = "";
    lugarE: string = "";
    fechasE: Date = new Date();
    horasE: string = "";
    estatusR: string = "";
    total: number = 0
    vehiculo: string = "";
    descuento: number = 0;
    license : string = "";
    identification: string ="";
}

export class UsuarioModel {
  _id?: string;
  nombre: string = "";
  apellidos: string = "";
  correo: string = "";
  contrasena: string = "";
  telefono: number = 0;
  lugarS: string = "";
  rol: string = "";
}

export class ReservaLugarModel {
   lugarS: string = "";
   fechasS: Date = new Date();
   horasS: string = "";
   fechasE: Date = new Date();
   horasE: string = "";
   lugarE: string = "";
   descuento: number = 0;
 }


// export interface AutoModel {
//     _id?: string;
//     imagen: String;
//     marca: string;
//     modelo: string;
//     anio: number;
//     placas: string;
//     asientos: number;
//     maletas: number;
//     tipoCaja: string;
//     tipoVehiculo: string;
//     cantVehiculos: number;
//     categoria:string;
//     precioDia: number;
//   }

export interface AutoModel {
  _id?: string;
  ubicacion: {
    ciudad: string;
    direccion: string;
  };
  marca: string;
  modelo: string;
  anio: number;
  color: string;
  tipo: string;
  transmision: string;
  kilometraje: number;
  estado: string;
  tarifa_dia: number;
  imagenes: string[]; // Asumiendo que puede haber varias imágenes
  cantVehiculos?: number;  // Esto puede estar disponible dependiendo de los datos, si no existe puedes omitirlo
  categoria?: string; // Si la categoría es opcional
}

  
