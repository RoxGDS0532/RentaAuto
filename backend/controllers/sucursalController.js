const Sucursal = require("../models/Sucursal");

exports.createSucursal = async (req, res) => {
    try {
            let sucursal;
    
            //Creamos nuestro auto
            sucursal = new Sucursal(req.body);
    
            await sucursal.save();
            res.send(sucursal);
    
        } catch (error) {
            console.error(error);
            res.status(500).send('Error en el server');
        }
}

exports.getSucursal = async (req, res) => {
    try {
        const sucursales = await Sucursal.find({});
        res.json(sucursales);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el server');
    }
}