const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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
          secret: '6Lcdg90qAAAAABnM91XshaND3q7iFgLU1Y5TVTgQ',
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

    // Comparar las contraseñas directamente (sin encriptación)
    if (user.password !== password) {
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
