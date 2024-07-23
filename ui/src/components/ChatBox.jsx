import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/system";
import moment from "moment/moment";
import React from "react";
import { FORMAT_DATE_TIME } from "../const/timeFormat";
import { useBoundStore } from "../slices";

const MessageRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "4px",
});

export default function ChatBox({ messages }) {
  const { userInfo } = useBoundStore();
  let prevSender = null;
  let nextSender = messages[1]?.sender;

  return messages.map((message, index) => {
    const isSamePrevSender = prevSender === message.sender;
    prevSender = message.sender;
    if (index < messages.length - 1) {
      nextSender = messages[index + 1].sender;
    }

    let isSameNextSender = nextSender === message.sender;
    if (index === messages.length - 1) {
      isSameNextSender = false;
    }

    return message.sender !== userInfo.userId ? (
      <MessageRow key={message._id}>
        <Avatar
          sx={{ width: 32, height: 32 }}
          alt={message.userName}
          src={userInfo.avartartUrl}
        />
        <Tooltip
          title={
            <Typography variant="caption" color={"white"}>
              {moment(message.timestamp).format(FORMAT_DATE_TIME)}
            </Typography>
          }
          arrow
        >
          <Box
            sx={{
              marginLeft: "10px",
              backgroundColor: "#e6eff7",
              borderRadius: `${isSamePrevSender ? 0 : "24px"} 24px 24px ${
                isSameNextSender ? 0 : "24px"
              }`,
              color: "#010101",
              p: 1,
              maxWidth: "60%",
              whiteSpace: "break-spaces",
            }}
          >
            <Typography>{message.content}</Typography>
          </Box>
        </Tooltip>
      </MessageRow>
    ) : (
      <MessageRow key={message._id} sx={{ justifyContent: "flex-end" }}>
        <Tooltip
          arrow
          title={
            <Typography variant="caption" color={"white"}>
              {moment(message.timestamp).format(FORMAT_DATE_TIME)}
            </Typography>
          }
        >
          <Box
            sx={{
              marginRight: "10px",
              backgroundColor: "primary.main",
              borderRadius: `24px ${isSamePrevSender ? 0 : "24px"} ${
                isSameNextSender ? 0 : "24px"
              } 24px`,
              color: "white",
              p: 1,
              maxWidth: "60%",
              whiteSpace: "break-spaces",
            }}
          >
            {message.content}
          </Box>
        </Tooltip>
      </MessageRow>
    );
  });
}
