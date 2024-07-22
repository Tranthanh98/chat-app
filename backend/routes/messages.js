const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const { checkAuthenticated } = require("../configs/passport");

router.get(
  "/:conversationId",
  checkAuthenticated,
  messageController.getMessages
);

module.exports = router;
