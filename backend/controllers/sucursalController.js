const Sucursal = require("../models/Sucursal");

exports.createSucursal = async (req, res) => {
    try {
        let sucursal = new Sucursal(req.body);
        await sucursal.save();
        res.send(sucursal);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};

exports.getSucursal = async (req, res) => {
    try {
        const sucursales = await Sucursal.find().populate("autos_disponibles");
        res.json(sucursales);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};

exports.deleteSucursal = async (req, res) => {
    try {
        const sucursal = await Sucursal.findByIdAndDelete(req.params.id);
        if (!sucursal) {
            return res.status(404).json({ msg: 'Sucursal no encontrada' });
        }
        res.json({ msg: 'Sucursal eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};
