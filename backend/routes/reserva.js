//Rutas para Reserva
const express = require('express');
const router = express.Router();
const ReservaController = require('../controllers/reservaController');

//Rutas para Reserva
router.get('/', ReservaController.getReserva);
router.put('/:id', ReservaController.updateReserva);
router.get('/:id', ReservaController.getReservaById);
router.delete('/:id', ReservaController.deleteReserva);
router.post('/', ReservaController.createReserva);


module.exports = router;