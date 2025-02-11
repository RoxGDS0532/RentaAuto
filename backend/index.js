const express = require('express');
const conectarDB = require('./config/db');
//Creamos el servidor
const app = express();

//Conectamos a la BD
conectarDB();

app.use('/api/auto', require('./routes/auto'));
//Definimos ruta principal
// app.get('/', (req, res) => {
//     res.send('Hola, mundo!');
// });

app.listen(3000, () =>{
    console.log('Servidor corriendo en puerto 3000');
});