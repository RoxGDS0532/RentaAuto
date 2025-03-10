const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env'})

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO);
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.error(error);
        process.exit(1); //Detener la app
    }
}

module.exports = conectarDB