const express = require("express");
const router = express.Router();
const conversationController = require("../controllers/conversationController");
const { checkAuthenticated } = require("../configs/passport");

router.post("/", checkAuthenticated, conversationController.createConversation);
router.get("/", checkAuthenticated, conversationController.getConversations);
router.get(
  "/:conversationId/details",
  checkAuthenticated,
  conversationController.getConversationById
);
router.get(
  "/:conversationId/unread/:userId",
  checkAuthenticated,
  conversationController.getUnreadMessageCount
);

module.exports = router;
