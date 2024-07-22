import React, { useCallback, useEffect, useState } from "react";
import { Box, Avatar, Typography, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { styled } from "@mui/system";
import ChatBox from "./ChatBox";
import { VideoCall } from "@mui/icons-material";
import CallIcon from "@mui/icons-material/Call";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useBoundStore } from "../slices";
import * as httpClient from "../utils/httpClient";
import socket from "../utils/sockerioService";
import { useParams } from "react-router-dom";

const ChatHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "10px",
  borderBottom: "1px solid #ddd",
});

const ChatBody = styled(Box)({
  padding: "20px",
  flex: 1,
  overflowY: "auto",
  backgroundColor: "#f9f9f9",
});

const ChatFooter = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "10px",
  borderTop: "1px solid #ddd",
});

const ChatWindow = (props) => {
  const { userId } = useBoundStore();
  const { conversationId } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const getMessagesConversation = useCallback(() => {
    if (conversationId) {
      httpClient.sendGet(`/messages/${conversationId}`).then((res) => {
        const { data } = res;
        setMessages(data);
      });
    }
  }, [conversationId]);

  useEffect(() => {
    getMessagesConversation();
    // Join the conversation room
    socket.emit("joinConversation", conversationId);

    // Listen for new messages
    socket.on("receiveMessage", (message) => {
      console.log("receiveMessage");
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [conversationId, getMessagesConversation]);

  const sendMessage = () => {
    if (!newMessage.trim()) {
      console.log("empty");
      return;
    }
    const messageData = {
      conversationId,
      sender: userId,
      content: newMessage,
      contentType: "text", // Adjust this as needed
    };

    socket.emit("sendMessage", messageData);
    setNewMessage("");
  };

  const onKeyPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey) {
      e.preventDefault();
      console.log("shiftEnter");
      // sendMessage();
    } else if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
      console.log("not shiftEnter");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ChatHeader>
        <Avatar alt="Dianne Jhonson" src="/static/images/avatar/1.jpg" />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ marginLeft: "10px" }}>
            Dianne Jhonson
          </Typography>
          <Typography
            variant="body2"
            sx={{ marginLeft: "10px", color: "gray" }}
          >
            Last seen 3h ago
          </Typography>
        </Box>
        <Box sx={{ justifyContent: "flex-end", display: "flex", gap: 1 }}>
          <IconButton>
            <CallIcon color="primary" />
          </IconButton>
          <IconButton>
            <VideoCall color="primary" />
          </IconButton>
          <IconButton>
            <MoreHorizIcon color="primary" />
          </IconButton>
        </Box>
      </ChatHeader>
      <ChatBody>
        <ChatBox messages={messages} />
      </ChatBody>
      <ChatFooter>
        <IconButton>
          <AttachFileIcon />
        </IconButton>
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          placeholder="Write something..."
          variant="outlined"
          size="small"
          multiline
          maxRows={3}
          sx={{ marginRight: "10px", borderRadius: "24px" }}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={onKeyPress}
        />
        <IconButton onClick={sendMessage} color="primary">
          <SendIcon />
        </IconButton>
      </ChatFooter>
    </Box>
  );
};

export default ChatWindow;
