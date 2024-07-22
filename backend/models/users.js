const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  userName: String,
  friendlyName: String,
  email: String,
  address: String,
  createdDate: { type: Date, default: Date.now },
  active: Boolean,
  passwordHash: String,
  oauthProvider: String,
  avatartUrl: String,
  lastActive: { type: Date, default: Date.now },
});

userSchema.methods.setPassword = async function (password) {
  this.passwordHash = await bcrypt.hash(password, 10);
};

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model("users", userSchema);
