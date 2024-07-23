import {
  Avatar,
  Badge,
  Box,
  Chip,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBoundStore } from "../../slices";
import socket from "../../utils/sockerioService";
import { getSpecificTime } from "../../utils/timeExtension";

export default function UserChatItem({ conversation }) {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(
    conversation.participants.some((i) => i.active)
  );

  const { userId } = useBoundStore();

  let { conversationId } = useParams();
  const { conversationId: conversationIdStore, setConversationId } =
    useBoundStore();

  const handleSelectConversation = (id) => {
    setConversationId(id);
    navigate(`/chat/${id}`);
  };

  useEffect(() => {
    if (conversationId) {
      setConversationId(conversationId);
    }
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
  }, [conversation.participants, conversationId, setConversationId]);

  return (
    <ListItem
      button
      onClick={() => handleSelectConversation(conversation._id)}
      sx={{
        borderRadius: 2,
        backgroundColor:
          conversationIdStore === conversation._id ? "#31323d" : "white",
        color: conversationIdStore === conversation._id ? "white" : "black",
        boxShadow:
          conversationIdStore === conversation._id
            ? "rgb(38, 57, 77) 0px 20px 30px -10px;"
            : "rgba(0, 0, 0, 0.15) 0px 2px 8px;",
        marginBottom: 1,
      }}
    >
      <Box>
        <Badge
          color="success"
          variant="dot"
          sx={{
            ".MuiBadge-badge": {
              height: "12px !important",
              width: "12px !important",
              top: "4px !important",
              right: "6px !important",
              borderRadius: "8px !important",
            },
          }}
          invisible={!isActive}
        >
          <Avatar
            alt={conversation.participants
              .map((i) => i.friendlyName || i.userName || i.email)
              .join(", ")}
            src={`${conversation.participants[0]?.avatartUrl}`}
          />
        </Badge>
      </Box>
      <Box width={"84%"}>
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
          <Typography
            variant="caption"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "80%",
            }}
          >{`${conversation.lastMessage?.sender === userId ? "You: " : ""}${
            conversation.lastMessage?.content
          }`}</Typography>
          {conversation.unreadCount > 0 ? (
            <Chip
              label={conversation.unreadCount}
              color="primary"
              size="small"
            />
          ) : null}
        </Stack>
      </Box>
    </ListItem>
  );
}
