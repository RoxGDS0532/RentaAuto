const Auto = require("../models/Auto");

exports.createAuto = async (req, res) => {
    try {
        let auto;

        //Creamos nuestro auto
        auto = new Auto(req.body);

        await auto.save();
        res.send(auto);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el server');
    }
}

exports.getAutos = async (req, res) => {
    try {
        const autos = await Auto.find({});
        res.json(autos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el server');
    }
}

exports.updateAuto = async (req, res) => {
    try {
        const { id } = req.params;
        const auto = await Auto.findByIdAndUpdate(id, req.body, { new: true });

        if (!auto) return res.status(404).json({msg:'No se encontró el auto'});

        res.send(auto);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el server');
    }
}

exports.getAutoById = async (req, res) => {
    try {
        const { id } = req.params;
        const auto = await Auto.findById(id);

        if (!auto) return res.status(404).json({msg:'No se encontró el auto'});

        res.send(auto);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el server');
    }
}

exports.deleteAuto = async (req, res) => {
    try {
        const { id } = req.params;
        const auto = await Auto.findByIdAndDelete(id);

        if (!auto) return res.status(404).json({msg:'No se encontró el auto'});

        res.send(auto);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el server');
    }
}
