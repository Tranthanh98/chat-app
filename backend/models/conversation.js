const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "messages" },
  lastUpdated: { type: Date, default: Date.now },
  type: { type: String, enum: ["private", "group"], required: true },
  groupName: String,
});

module.exports = mongoose.model("conversations", conversationSchema);
