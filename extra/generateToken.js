const jwt = require('jsonwebtoken');

exports.generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });
};