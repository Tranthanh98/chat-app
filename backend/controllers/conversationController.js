const Conversation = require("../models/conversation");
const Message = require("../models/message");
const User = require("../models/users");

// Create a new conversation
exports.createConversation = async (req, res) => {
  const { participants, groupName } = req.body;
  const type = participants?.length > 1 ? "group" : "private";

  const userId = req.userId;

  participants.push(userId);

  const existConversation = await Conversation.find({ participants });
  if (existConversation?.length > 0) {
    res.json({ conversations: existConversation });
    return;
  }

  try {
    const newConversation = new Conversation({ participants, type, groupName });
    await newConversation.save();

    if (type === "group") {
      const user = await User.findById(userId).exec();

      const newMessage = new Message({
        conversationId: newConversation._id,
        content: `${user.friendlyName || user.userName} has created a group`,
        contentType: "text",
        role: "system",
      });

      await newMessage.save();
    }
    res.status(201).json({ conversations: newConversation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get conversations for a user
exports.getConversations = async (req, res) => {
  const userId = req.userId;

  try {
    const conversations = await Conversation.find({ participants: userId })
      .sort({ lastUpdated: -1 })
      .populate("participants", {
        _id: 1,
        userName: 1,
        email: 1,
        active: 1,
        lastActive: 1,
        friendlyName: 1,
        avatartUrl: 1,
      })
      .populate("lastMessage");

    res.json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single conversation
exports.getConversationById = async (req, res) => {
  const conversationId = req.params.conversationId;
  const userId = req.user.id;

  try {
    const conversation = await Conversation.findById(conversationId)
      .populate("participants", "userName")
      .populate("lastMessage");

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Ensure the current user is part of the conversation
    if (!conversation.participants.includes(userId)) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get unread message count for a user in a conversation
exports.getUnreadMessageCount = async (req, res) => {
  const { conversationId } = req.params;
  const userId = req.user.id;

  try {
    const unreadCount = await Message.countDocuments({
      conversationId,
      readBy: { $ne: userId },
    });

    res.json({ unreadCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
