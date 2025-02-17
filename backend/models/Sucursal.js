const mongoose = require('mongoose');

const SucursalSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    direccion: {
        calle: { type: String, required: true },
        ciudad: { type: String, required: true },
        pais: { type: String, required: true }
    },
    contacto: {
        telefono: { type: Number, required: true },
        email: { type: String, required: true }
    },
    autos_disponibles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Auto' }]
},{ collection: 'sucursal' });

module.exports = mongoose.model('Sucursal', SucursalSchema);
