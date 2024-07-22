const Message = require("../models/message");
const Conversation = require("../models/conversation");

exports.getMessages = async (req, res) => {
  const userId = req.userId;
  const { conversationId } = req.params;

  try {
    const conversation = await Conversation.findById(conversationId)
      .populate("participants", { _id: 1 })
      .exec();

    if (!conversation) {
      res.status(404).message("Not found");
      return;
    }

    if (conversation.participants.includes(userId)) {
      res.status(401).message("not permission");
      return;
    }

    const messages = await Message.find({
      conversationId,
    }).populate("readBy", {
      _id: 1,
      userName: 1,
      email: 1,
      active: 1,
      lastActive: 1,
      friendlyName: 1,
      avatartUrl: 1,
    });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.saveMessage = async (data) => {
  const message = new Message(data);
  await message.save();
};
