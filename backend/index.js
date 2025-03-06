const express = require('express');
const cors = require('cors');  // Importamos el paquete cors
const conectarDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const Auto = require('./models/Auto');  // Modelo de Auto
const Sucursal = require('./models/Sucursal'); 

// Creamos el servidor
const app = express();

// Conectamos a la BD
conectarDB();

// Habilitamos CORS para permitir solicitudes desde el frontend en Angular (puerto 4200)
app.use(cors({
  origin: 'http://localhost:4200',  // Esto permite solicitudes desde tu frontend en Angular
  methods: ['GET', 'POST'],        // Métodos permitidos
  credentials: true,               // Permite enviar cookies si las estás utilizando
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la API
app.use('/api/auto', require('./routes/auto'));
app.use('/api/sucursal', require('./routes/sucursal'));
app.use('/api/users', userRoutes);
app.get('/api/buscar', async (req, res) => {
  try {
    if (!req.query.query) {
      return res.status(400).json({ error: 'Se requiere un parámetro de búsqueda' });
    }

    const query = req.query.query.toLowerCase();

    // Buscar en la colección de Autos y Sucursales
    const autos = await Auto.find({
      $or: [
        { nombre: { $regex: query, $options: 'i' } },
        { descripcion: { $regex: query, $options: 'i' } }
      ]
    });

    const sucursales = await Sucursal.find({
      $or: [
        { nombre: { $regex: query, $options: 'i' } },
        { descripcion: { $regex: query, $options: 'i' } }
      ]
    });

    const resultados = [...autos, ...sucursales];

    res.json(resultados);
  } catch (error) {
    console.error('Error al buscar datos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Arrancamos el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
