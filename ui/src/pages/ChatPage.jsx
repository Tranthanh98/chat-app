import React, { useEffect } from "react";
import { Container, Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import RightPanel from "../components/RightPanel";
import socket from "../utils/sockerioService";
import { useBoundStore } from "../slices";

const ChatPage = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const { userId } = useBoundStore();

  useEffect(() => {
    socket.emit("userActive", userId);
  }, [userId]);

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
