const express = require('express');
const { sendMail,getInbox ,getMailById,replyMail , getSentMails} = require('../controllers/mail');
const { verifyToken } = require('../middlewares/jwt'); 

const router = express.Router();

router.post('/mail/send', verifyToken, sendMail);

router.get('/mail/inbox', verifyToken, getInbox);  
router.get('/mail/inbox/:id', verifyToken,getMailById);
router.post('/mail/reply', verifyToken, replyMail);
router.get('/mail/sent', verifyToken, getSentMails); 


module.exports = router;
