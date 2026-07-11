const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  senderEmail: { type: String, required: true, lowercase: true },
  body: { type: String, required: true, lowercase: true },
  createdAt: { type: Date, default: Date.now },
});

const mailSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderEmail: { type: String, required: true, lowercase: true },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
        recipient: {
      type: String,
      required: true,
      lowercase: true,
    },
    subject: { type: String, required: true, lowercase: true },
    body: { type: String, required: true, lowercase: true },
    replies: [replySchema],
    isReadByRecipient: { type: Boolean, default: false },
    isReadBySender: { type: Boolean, default: false },

    latestActivity: { type: Date, default: Date.now },
  },
  { timestamps: true },
);
mailSchema.index({
  recipient: 1,
  updatedAt: -1,
});

mailSchema.index({
  senderId: 1,
  updatedAt: -1,
});

module.exports = mongoose.model("Mail", mailSchema);
