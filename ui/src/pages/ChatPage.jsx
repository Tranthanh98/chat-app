import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import ChatWindow from "../components/ChatWindow";
import RightPanel from "../components/RightPanel";
import Sidebar from "../components/Sidebar";
import useFetchingConversationHook from "../hooks/useFetchingConversationHook";
import { useBoundStore } from "../slices";
import socket from "../utils/sockerioService";

const ChatPage = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const { userId, conversationId } = useBoundStore();

  const { fetchingConversation } = useFetchingConversationHook();

  useEffect(() => {
    socket.emit("userActive", userId);
  }, [userId]);

  useEffect(() => {
    socket.emit("openConversation", {
      conversationId,
      userId,
    });
  }, [conversationId, userId]);

  useEffect(() => {
    fetchingConversation();
  }, [fetchingConversation]);

  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", height: "100vh", padding: 0 }}
    >
      <Box
        sx={{
          width: "20%",
          minWidth: "280px",
          borderRight: "1px solid #ddd",
          backgroundColor: "#ececec",
          display: { xs: "none", sm: "block", md: "block" },
        }}
      >
        <Sidebar />
      </Box>
      <Box sx={{ flex: 1 }}>
        <ChatWindow />
      </Box>
      <Box
        width={"20%"}
        sx={{ display: { xs: "none", md: "none", lg: "block" } }}
      >
        <RightPanel />
      </Box>
    </Container>
  );
};

export default ChatPage;
