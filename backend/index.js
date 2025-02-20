const express = require('express');
const cors = require('cors');  // Importamos el paquete cors
const conectarDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

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

// Arrancamos el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
