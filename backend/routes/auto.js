//Rutas para Auto
const express = require('express');
const router = express.Router();
const AutoController = require('../controllers/autoController');

//Rutas para Auto
router.get('/', AutoController.getAutos);
router.put('/:id', AutoController.updateAuto);
router.get('/:id', AutoController.getAutoById);
router.delete('/:id', AutoController.deleteAuto);
router.post('/', AutoController.createAuto);


module.exports = router;