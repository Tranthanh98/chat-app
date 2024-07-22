const socketIo = require("socket.io");
const User = require("../models/users");
const Message = require("../models/message");
const Conversation = require("../models/conversation");

let io;

const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    // Handle user joining
    socket.on("userActive", async (userId) => {
      socket.userId = userId;
      await User.findByIdAndUpdate(userId, {
        active: true,
        lastActive: Date.now(),
      });
      console.log("user active", userId);
      socket.broadcast.emit("userStatus", { userId, isOnline: true });
    });

    // Handle user disconnecting
    socket.on("disconnect", async () => {
      if (socket.userId) {
        console.log("user disconnected", socket.userId);
        await User.findByIdAndUpdate(socket.userId, {
          active: false,
          lastActive: Date.now(),
        });
        socket.broadcast.emit("userStatus", {
          userId: socket.userId,
          isOnline: false,
        });
      }
    });

    // Handle user activity
    socket.on("activity", async () => {
      if (socket.userId) {
        await User.findByIdAndUpdate(socket.userId, { lastActive: Date.now() });
      }
    });

    // Join conversation room
    socket.on(`joinConversation`, (conversationId) => {
      socket.join(conversationId);
    });

    socket.on(`joinUserRoom`, (userId) => {
      socket.join(userId);
    });

    // Send message
    socket.on("sendMessage", async (data) => {
      const { conversationId, sender, content, contentType } = data;
      const newMessage = new Message({
        conversationId,
        sender,
        content,
        contentType,
      });

      try {
        await newMessage.save();

        // Update last message in conversation
        await Conversation.findByIdAndUpdate(conversationId, {
          lastMessage: newMessage._id,
          lastUpdated: Date.now(),
        });

        // Emit the new message to all users in the conversation
        io.to(conversationId).emit("receiveMessage", newMessage);

        const conversationParticipants = await Conversation.findById(
          conversationId,
          {
            participants: 1,
          }
        ).exec();

        conversationParticipants.participants.forEach((participant) => {
          const participantId = participant._id;
          io.to(participantId.toString()).emit("newMessage", {
            conversationId,
          });
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });
  });
};

const getIo = () => io;

module.exports = {
  initializeSocket,
  getIo,
};
