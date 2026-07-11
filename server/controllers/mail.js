const Mail = require("../models/mail");
const Helpers = require("../utils/Helpers");
const User = require("../models/user");
const { getIO } = require("../config/socket");

const sendMail = async (req, res) => {
  try {
    const { recipient, subject, body } = req.body;

    if (!recipient || !subject || !body) {
      return Helpers.sendBadRequest(
        res,
        "Recipient, subject, and body are required",
      );
    }

    if (
      recipient.trim().toLowerCase() === req.user.email.trim().toLowerCase()
    ) {
      return Helpers.sendBadRequest(res, "You cannot send mail to yourself");
    }

    const recipientUser = await User.findOne({
      email: recipient.trim().toLowerCase(),
    });
    if (!recipientUser) {
      return Helpers.sendBadRequest(res, "Recipient email does not exist");
    }

    const newMail = new Mail({
      senderId: req.user.id,
      senderEmail: req.user.email,
      recipient,
      recipientId: recipientUser._id,

      subject,
      body,
      isReadByRecipient: false,
      isReadBySender: true,
    });
    await newMail.save();

    getIO().to(recipientUser._id.toString()).emit("mail:new", newMail);

    return Helpers.sendCreated(
      res,
      { mail: newMail },
      "Mail sent successfully",
    );
  } catch (error) {
    console.error(error);
    return Helpers.sendServerError(res, "Something went wrong", error);
  }
};

const getInbox = async (req, res) => {
  try {
    const userEmail = req.user.email;

    if (!userEmail) {
      return Helpers.sendBadRequest(res, "User email not found");
    }

    const inboxMails = await Mail.find({ recipient: userEmail }).sort({
      updatedAt: -1,
    });

    return Helpers.sendSuccess(res, inboxMails);
  } catch (error) {
    console.error(error);
    return Helpers.sendServerError(res, "Failed to fetch inbox mails", error);
  }
};
const getMailById = async (req, res) => {
  try {
    const mailId = req.params.id;
    const userEmail = req.user.email;

    const mail = await Mail.findById(mailId);
    if (!mail) return Helpers.sendNotFound(res, "Mail not found");

    const isSender = mail.senderEmail === userEmail;
    const isRecipient = mail.recipient === userEmail;

    if (!isSender && !isRecipient)
      return Helpers.sendForbidden(res, "Unauthorized access");

    if (isRecipient && !mail.isReadByRecipient) {
      mail.isReadByRecipient = true;
      await mail.save();
    }

    if (isSender && !mail.isReadBySender) {
      mail.isReadBySender = true;
      await mail.save();
    }

    if (mail.replies && mail.replies.length > 0) {
      mail.replies.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    }

    return Helpers.sendSuccess(res, mail);
  } catch (err) {
    console.error(err);
    return Helpers.sendServerError(res, "Error retrieving mail", err);
  }
};

const replyMail = async (req, res) => {
  try {
    const body = req.body.replyData;
    const { mailId } = req.params;
    const senderId = req.user.id;
    const senderEmail = req.user.email;

    const mail = await Mail.findById(mailId);
    if (!mail) {
      return Helpers.sendNotFound(res, "Original mail not found");
    }

    const reply = {
      senderId,
      senderEmail,
      body,
    };

    console.log(reply);

    mail.replies.push(reply);

    if (mail.recipient === senderEmail) {
      mail.isReadBySender = false;
    } else {
      mail.isReadByRecipient = false;
    }

    await mail.save();
    const receiverId =
      senderEmail === mail.senderEmail
        ? mail.recipientId.toString()
        : mail.senderId.toString();
    getIO().to(receiverId).emit("mail:reply", mail);

    return Helpers.sendSuccess(res, mail, "Reply added");
  } catch (error) {
    console.error(error);
    return Helpers.sendServerError(res, "Something went wrong", error);
  }
};

const getSentMails = async (req, res) => {
  try {
    const senderId = req.user.id;

    if (!senderId) {
      return Helpers.sendBadRequest(res, "User ID not found");
    }

    const sentMails = await Mail.find({ senderId }).sort({ updatedAt: -1 });

    return Helpers.sendSuccess(res, sentMails);
  } catch (error) {
    console.error(error);
    return Helpers.sendServerError(res, "Failed to fetch sent mails", error);
  }
};

module.exports = {
  sendMail,
  getInbox,
  getMailById,
  replyMail,
  getSentMails,
};
