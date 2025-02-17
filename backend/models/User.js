const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  correoElectronico: {
    type: String,
    required: true,
    unique: true,
  },
  numeroTelefono: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ['Encargado', 'Administrador'],
    default: 'Encargado',
  },
});

module.exports = mongoose.model('User', userSchema);
