const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "conversations",
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  role: {
    type: String,
    enum: ["user", "system"],
    required: true,
    default: "user",
  },
  content: { type: String, required: true },
  contentType: {
    type: String,
    enum: ["text", "link", "image", "video", "file", "voice", "location"],
    required: true,
  },
  isRead: { type: Boolean, default: false },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("messages", messageSchema);
