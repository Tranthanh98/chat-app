import { Box, CircularProgress } from "@mui/material";
import React from "react";
import "../App.css";

export default function Loading() {
  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      bgcolor={"#98cfb2"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <div class="pendulum">
        <div class="pendulum_box">
          <div class="ball first"></div>
          <div class="ball"></div>
          <div class="ball"></div>
          <div class="ball"></div>
          <div class="ball last"></div>
        </div>
      </div>
      <CircularProgress />
    </Box>
  );
}
