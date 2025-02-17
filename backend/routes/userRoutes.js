const express = require('express');
const { newUser, loginUser, getUsers } = require('../controllers/userController');
const validateToken = require('./validateToken');

const router = express.Router();

// Crear un nuevo usuario
router.post('/', newUser);

// Login de usuario
router.post('/login', loginUser);

// Obtener usuarios, con validación de token
router.get('/', validateToken, getUsers);

module.exports = router;
