const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.newUser = async (req, res) => {
  const { username, password, nombre, apellido, correoElectronico, numeroTelefono, rol } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ username }, { correoElectronico }] });
    if (userExists) {
      return res.status(400).json({ msg: 'Usuario o correo ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      nombre,
      apellido,
      correoElectronico,
      numeroTelefono,
      rol,
    });

    await newUser.save();
    res.status(201).json({ msg: `Usuario ${username} creado exitosamente!` });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear el usuario', error });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user._id, username: user.username, rol: user.rol }, process.env.SECRET_KEY, {
      expiresIn: '2h',
    });

    res.json({ msg: 'Login exitoso', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al iniciar sesión', error });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener usuarios', error });
  }
};
