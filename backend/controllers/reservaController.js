const Reserva = require("../models/Reserva");

exports.createReserva = async (req, res) => {
    try {
        let reserva;

        //Creamos nuestro reserva
        reserva = new Reserva(req.body);

        await reserva.save();
        res.send(reserva);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el server');
    }
}

exports.getReserva = async (req, res) => {
    try {
        // Simulación de error 500 forzado
        if (req.query.categoria === 'error500') {
            throw new Error('Simulación de error 500');
        }
        const reservas = await Reserva.find({});
        res.json(reservas);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el server');
    }
}


exports.updateReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await Reserva.findByIdAndUpdate(id, req.body, { new: true });

        if (!reserva) return res.status(404).json({msg:'No se encontró la reserva'});

        res.send(reserva);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el server');
    }
}

exports.getReservaById = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await Reserva.findById(id);

        if (!reserva) return res.status(404).json({msg:'No se encontró la reserva'});

        res.send(reserva);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el server');
    }
}

exports.deleteReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await Reserva.findByIdAndDelete(id);

        if (!reserva) return res.status(404).json({msg:'No se encontró la reserva'});

        res.send(reserva);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el server');
    }
}
