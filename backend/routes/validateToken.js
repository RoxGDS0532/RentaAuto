const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Acceso denegado' });
  }

  try {
    const decoded = jwt.verify(token.slice(7), process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token no válido' });
  }
};

module.exports = validateToken;
