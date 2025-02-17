//Rutas para la Sucursal
const express = require('express'); 
const router = express.Router();
const SucursalController = require('../controllers/sucursalController');

//Rutas para Sucursal
router.get('/', SucursalController.getSucursal);
/*router.get('/:id', SucursalController.getSucursalById);
router.put('/:id', SucursalController.updateSucursal);
router.delete('/:id', SucursalController.deleteSucursal;*/
router.post('/', SucursalController.createSucursal);


module.exports = router;