const mongoose = require('mongoose');

const AutoSchema = mongoose.Schema({
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    anio: { type: Number, required: true },
    color: { type: String, required: true },
    tipo: { type: String, required: true },
    transmision: { type: String, required: true },
    kilometraje: { type: Number, required: true },
    estado: { type: String, default: 'Disponible' },
    tarifa_dia: { type: Number, required: true },
    ubicacion: {
        ciudad: { type: String, required: true },
        direccion: { type: String, required: true }
    },
    imagenes: [{ type: String }]
},{ collection: 'auto' });

module.exports = mongoose.model('Auto', AutoSchema);
