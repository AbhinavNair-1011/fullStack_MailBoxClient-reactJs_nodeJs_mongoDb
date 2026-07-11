const jwt = require('jsonwebtoken');
const Helpers = require('../utils/Helpers');

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return Helpers.sendUnauthorized(res, 'No token provided');

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
    if (err) return Helpers.sendUnauthorized(res, 'Invalid token');
    req.user= result;
    next();
  });
};

module.exports = { verifyToken };