//Rutas para Auto
const express = require('express');
const router = express.Router();
//const AutoController = require('./controllers/autoController');

//Rutas para Auto
/*router.get('/autos', AutoController.getAutos);
router.get('/autos/:id', AutoController.getAutoById);
router.post('/autos', AutoController.createAuto);
router.put('/autos/:id', AutoController.updateAuto);
router.delete('/autos/:id', AutoController.deleteAuto);*/
router.post('/',()=>{
    console.log('Agregando Auto');
})

module.exports = router;