const express = require('express');
const router = express.Router();
const { register, login, logout, me } = require('../controllers/auth');
const {verifyToken} = require('../middlewares/jwt');

router.post('/auth/register', register);
router.post('/auth/login', login);

router.post('/auth/logout', logout);
router.get('/auth/me', verifyToken, me);

module.exports = router;    