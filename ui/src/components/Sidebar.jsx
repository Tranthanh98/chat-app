import React, { useState } from "react";
import TabsChat from "./TabsChat";
import { Box } from "@mui/material";

export default function Sidebar() {
  const [leftcomponent, setLeftComponent] = useState(null);

  return (
    <Box sx={{ margin: 1 }}>
      <TabsChat onChangeLeftComponent={setLeftComponent} />
      <Box>{leftcomponent}</Box>
    </Box>
  );
}
