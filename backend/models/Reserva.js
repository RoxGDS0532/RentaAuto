const mongoose = require('mongoose');

const ReservaSchema = mongoose.Schema({
    cliente: { type: String, required: true },
    sucursalA: { type: String, required: true },
    fechaA: { type: Date, required: true },
    horaA: { type: String, required: true },
    sucursalD: { type: String, required: true },
    fechaD: { type: Date, required: true },
    horaD: { type: String, required: true },
    estado: { type: String, default: 'Activo' },
    costo_total: { type: Number, required: false },
    vehiculo: { type: String, required: true },
    telefono: { type: String, required: true },
    correo: { type: String, required: true }
  }, { collection: 'reserva' });
  
  module.exports = mongoose.model('Reserva', ReservaSchema);
  