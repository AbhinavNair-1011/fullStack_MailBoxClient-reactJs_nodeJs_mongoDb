const Mail = require('../models/mail');
const Helpers = require('../utils/Helpers');  

const sendMail = async (req, res) => {
  try {
    const { recipient, subject, body } = req.body;

    if (!recipient || !subject || !body) {
      return Helpers.sendBadRequest(res, 'Recipient, subject, and body are required');
    }

    const newMail = new Mail({
      senderId: req.user.id,
      senderEmail: req.user.email,
      recipient,
      subject,
      body
    });

    await newMail.save();

    return Helpers.sendCreated(res, { mail: newMail }, 'Mail sent successfully');
  } catch (error) {
    console.error(error);
    return Helpers.sendServerError(res, 'Something went wrong', error);
  }
};


const getInbox = async (req, res) => {
  try {
    const userEmail = req.user.email;

    if (!userEmail) {
      return Helpers.sendBadRequest(res, 'User email not found');
    }

    const inboxMails = await Mail.find({ recipient: userEmail }).sort({ createdAt: -1 });

    return Helpers.sendSuccess(res, inboxMails);
  } catch (error) {
    console.error(error);
    return Helpers.sendServerError(res, 'Failed to fetch inbox mails', error);
  }
};

const getMailById = async (req, res) => {
  try {
    const mailId = req.params.id;
    const userId = req.user.id;

    if (!mailId) {
      return Helpers.sendBadRequest(res, 'Mail ID is required');
    }

    const mail = await Mail.findById(mailId);

    if (!mail) {
      return Helpers.sendNotFound(res, 'Mail not found');
    }

    if (
      mail.senderId.toString() !== userId &&
      mail.recipient !== req.user.email 
    ) {
      return Helpers.sendForbidden(res, 'Unauthorized access');
    }

    return Helpers.sendSuccess(res, mail);
  } catch (error) {
    console.error(error);
    return Helpers.sendServerError(res, 'Error retrieving mail', error);
  }
};


const replyMail = async (req, res) => {
  try {
    const { recipient, subject, body } = req.body;
    const senderId = req.user.id;
    const senderEmail = req.user.email;

    if ( !body) {
      return Helpers.sendBadRequest(res, 'body is required and not empty');
    }

    const newReply = new Mail({
      senderId,
      senderEmail,
      recipient,
      subject,
      body
    });

    await newReply.save();

    return Helpers.sendCreated(res, { mail: newReply }, 'Reply sent successfully');
  } catch (error) {
    console.error(error);
    return Helpers.sendServerError(res, 'Something went wrong', error);
  }
};

const getSentMails = async (req, res) => {
  try {
    const senderId = req.user.id;

    if (!senderId) {
      return Helpers.sendBadRequest(res, 'User ID not found');
    }

    const sentMails = await Mail.find({ senderId }).sort({ createdAt: -1 });

    return Helpers.sendSuccess(res, sentMails);
  } catch (error) {
    console.error(error);
    return Helpers.sendServerError(res, 'Failed to fetch sent mails', error);
  }
};


module.exports = {
  sendMail,
  getInbox,
  getMailById,
  replyMail,
  getSentMails
};
