const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth');
const {verifyToken} = require('../middlewares/jwt');

router.post('/auth/register', register);
router.post('/auth/login', login);

router.post('/auth/logout', verifyToken, logout);
module.exports = router;