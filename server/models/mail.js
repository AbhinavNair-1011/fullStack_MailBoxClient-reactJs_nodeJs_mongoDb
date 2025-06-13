const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  senderEmail: { type: String, required: true , lowercase:true  },
  body: { type: String, required: true , lowercase:true },
  createdAt: { type: Date, default: Date.now }
});

const mailSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  senderEmail: { type: String, required: true, lowercase:true },
  recipient: { type: String, required: true , lowercase:true },
  subject: { type: String, required: true , lowercase:true },
  body: { type: String, required: true , lowercase:true  },
  replies: [replySchema],
  isReadByRecipient: { type: Boolean, default: false },
  isReadBySender: { type: Boolean, default: false },

  latestActivity: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Mail", mailSchema);
