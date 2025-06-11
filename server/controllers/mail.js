const Mail = require('../models/mail');

const sendMail = async (req, res) => {
  try {
    const { recipient, subject, body } = req.body;
    
    const newMail = new Mail({
      senderId: req.user.id,         
      senderEmail: req.user.email,    
      recipient,
      subject,
      body
    });

    await newMail.save();

    return res.status(201).json({ message: 'Mail sent successfully', mail: newMail });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong', error });
  }
};


const getInbox = async (req, res) => {
  try {
    const userEmail = req.user.email; 

    const inboxMails = await Mail.find({ recipient: userEmail }).sort({ createdAt: -1 });

    res.status(200).json(inboxMails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch inbox mails' });
  }
};

const getMailById = async (req, res) => {
  try {
    const mailId = req.params.id;
    const userId = req.user.id;

    const mail = await Mail.findById(mailId);

    if (!mail) {
      return res.status(404).json({ message: 'Mail not found' });
    }

    if (
      mail.senderId.toString() !== userId &&
      mail.recipient !== req.user.email 
    ) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.json(mail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving mail', error });
  }
};




const replyMail = async (req, res) => {
  try {
    const { recipient, subject, body } = req.body;
    const senderId = req.user.id;
    const senderEmail = req.user.email;

    const newReply = new Mail({
      senderId,
      senderEmail,
      recipient,
      subject,
      body
    });

    await newReply.save();

    return res.status(201).json({ message: 'Reply sent successfully', mail: newReply });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong', error });
  }
};


module.exports = {
  sendMail,
  getInbox,
  getMailById,
  replyMail
  
};

