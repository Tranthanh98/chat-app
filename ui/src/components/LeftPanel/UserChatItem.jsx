import {
  Avatar,
  Badge,
  Box,
  Chip,
  ListItem,
  ListItemAvatar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSpecificTime } from "../../utils/timeExtension";
import { useBoundStore } from "../../slices";
import socket from "../../utils/sockerioService";

export default function UserChatItem({ conversation }) {
  console.log("conversation", conversation);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(
    conversation.participants.some((i) => i.active)
  );

  const { userId } = useBoundStore();

  let { conversationId } = useParams();

  const handleSelectConversation = (id) => {
    navigate(`/chat/${id}`);
  };

  useEffect(() => {
    socket.on("userStatus", ({ userId: userConversationId, isOnline }) => {
      console.log("userStatus socket");
      if (
        conversation.participants.map((i) => i._id).includes(userConversationId)
      ) {
        setIsActive(isOnline);
      }
    });

    return () => {
      socket.off("userStatus");
    };
  }, [conversation.participants]);

  return (
    <ListItem
      button
      onClick={() => handleSelectConversation(conversation._id)}
      sx={{
        borderRadius: 2,
        backgroundColor:
          conversationId === conversation._id ? "#31323d" : "white",
        color: conversationId === conversation._id ? "white" : "black",
        boxShadow:
          conversationId === conversation._id
            ? "rgb(38, 57, 77) 0px 20px 30px -10px;"
            : "rgba(0, 0, 0, 0.15) 0px 2px 8px;",
        marginBottom: 1,
      }}
    >
      <ListItemAvatar>
        <Badge
          color="success"
          variant="dot"
          sx={{ top: 4, right: 6 }}
          invisible={!isActive}
        >
          <Avatar
            alt={conversation.participants
              .map((i) => i.friendlyName || i.userName || i.email)
              .join(", ")}
            src={`${conversation.participants[0]?.avatartUrl}`}
          />
        </Badge>
      </ListItemAvatar>
      <Box width={"100%"}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6">
            {conversation.participants
              .map((i) => i.friendlyName || i.userName || i.email)
              .join(", ")}
          </Typography>
          <Typography variant="caption" sx={{ marginLeft: "auto" }}>
            {getSpecificTime(conversation.lastUpdated)}
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="caption">{`${
            conversation.lastMessage?.sender === userId ? "You: " : ""
          }${conversation.lastMessage?.content}`}</Typography>
          <Chip label="3" color="primary" size="small" />
        </Stack>
      </Box>
    </ListItem>
  );
}
