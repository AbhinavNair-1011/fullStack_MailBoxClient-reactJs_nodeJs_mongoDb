const Mail = require('../models/mail');

const sendMail = async (req, res) => {
  try {
    const { recipient, subject, body } = req.body;
    const sender = req.userId;  

    const newMail = new Mail({
      sender,
      recipient,
      subject,
      body
    });

    await newMail.save();

    return res.status(201).json({ message: 'Mail sent successfully', mail: newMail });
  } catch (error) {
    console.error(error);
   return  res.status(500).json({ message: 'Something went wrong', error });
  }
};

module.exports = {
  sendMail
};
