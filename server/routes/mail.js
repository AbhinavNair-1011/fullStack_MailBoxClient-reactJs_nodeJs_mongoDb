const express = require('express');
const { sendMail } = require('../controllers/mail');
const { verifyToken } = require('../middlewares/jwt'); 

const router = express.Router();

router.post('/mail/send', verifyToken, sendMail);

module.exports = router;
