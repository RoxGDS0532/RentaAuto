const express = require('express');
const { newUser, loginUser, getUsers, forgotPassword, resetPassword } = require('../controllers/userController');
const validateToken = require('./validateToken');

const router = express.Router();

// Crear un nuevo usuario
router.post('/', newUser);

router.post('/forgot-password',forgotPassword);

router.post('/reset-password', resetPassword);


// Login de usuario
router.post('/login', loginUser);

// Obtener usuarios, con validación de token
router.get('/', validateToken, getUsers);

module.exports = router;
