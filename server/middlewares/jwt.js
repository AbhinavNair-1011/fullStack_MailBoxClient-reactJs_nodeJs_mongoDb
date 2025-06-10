const jwt = require('jsonwebtoken');
const Helpers = require('../utils/helpers');

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return Helpers.sendUnauthorized(res, 'No token provided');

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
    if (err) return Helpers.sendForbidden(res, 'Invalid token');
    req.userId = result.id;
    next();
  });
};

module.exports = { verifyToken };