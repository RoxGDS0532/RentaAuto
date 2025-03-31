const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

// Función para iniciar sesión de usuario
// Función para iniciar sesión de usuario
exports.loginUser = async (req, res) => {
  const { username, password, recaptchaToken } = req.body;

  try {
    // Verificar el token de reCAPTCHA con Google
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: '6Lcdg90qAAAAABnM91XshaND3q7iFgLU1Y5TVTgQ', // Clave secreta (asegúrate de guardarla en variables de entorno)
          response: recaptchaToken,
        },
      }
    );

    if (!response.data.success) {
      return res.status(400).json({ msg: 'Error de verificación de reCAPTCHA' });
    }

    // Buscar el usuario
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Usuario no encontrado' });
    }

    // Comparar la contraseña ingresada con la almacenada en la BD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Contraseña incorrecta' });
    }

    // Generar el token
    const token = jwt.sign({ id: user._id, username: user.username, rol: user.rol }, process.env.SECRET_KEY, {
      expiresIn: '2h',
    });

    res.json({ msg: 'Login exitoso', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al iniciar sesión', error });
  }
};


// Configuración del transportador de correo
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // Esto a veces ayuda en entornos de desarrollo
  }
});



const jwtSecret = process.env.JWT_SECRET;

exports.forgotPassword = async (req, res) => {
  const { correoElectronico } = req.body;

  try {
    const user = await User.findOne({ correoElectronico });
    if (!user) return res.status(400).json({ msg: 'Correo no registrado' });

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
    const link = `http://localhost:4200/reset-password?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.correoElectronico,
      subject: 'Recuperación de Contraseña',
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${link}`
    });

    res.json({ msg: 'Correo enviado' });
  } catch (error) {
    console.error('Error en forgotPassword:', error);
    res.status(500).json({ msg: 'Error en el servidor', error });
  }
};


exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ msg: 'Contraseña actualizada' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar contraseña', error });
  }
};


// Función para crear un nuevo usuario
exports.newUser = async (req, res) => {
  const { username, password, nombre, apellido, correoElectronico, numeroTelefono, rol } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      password: hashedPassword,
      nombre,
      apellido,
      correoElectronico,
      numeroTelefono,
      rol,
    });

    await user.save();

    res.json({ msg: 'Usuario creado exitosamente', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear usuario', error });
  }
};

// Función para obtener todos los usuarios (con validación de token)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener usuarios', error });
  }
};


