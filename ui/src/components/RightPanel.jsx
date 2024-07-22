import React from "react";
import { useBoundStore } from "../slices";
import { Box, Typography } from "@mui/material";

export default function RightPanel() {
  const { userInfo } = useBoundStore();
  return (
    <Box>
      <Typography>{userInfo.name}</Typography>
      <Typography>{userInfo.email}</Typography>
      <Typography>{userInfo.userId}</Typography>
    </Box>
  );
}
