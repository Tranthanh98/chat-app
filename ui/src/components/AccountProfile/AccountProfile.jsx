import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useBoundStore } from "../../slices";

export default function AccountProfile({ open, onClose }) {
  const { userInfo, clearUserInfo } = useBoundStore();

  const _handleLogout = () => {
    clearUserInfo();
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box>
        <DialogTitle id="alert-dialog-title">Account Setting</DialogTitle>
        <DialogContent>
          <Avatar src={userInfo?.avatartUrl} />
          <Button variant="contained" color="primary" onClick={_handleLogout}>
            Logout
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  );
}
