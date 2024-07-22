import * as React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import GroupIcon from "@mui/icons-material/Group";
import { Box, IconButton, Tooltip } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatPanel from "./LeftPanel/ChatPanel";
import AccountProfile from "./AccountProfile/AccountProfile";

const IconList = [
  {
    title: "Chat",
    icon: <MarkChatUnreadIcon />,
    component: <ChatPanel />,
  },
  {
    title: "Call",
    icon: <PhoneIcon />,
    component: <div></div>,
  },
  {
    title: "Group Chat",
    icon: <GroupIcon />,
    component: <div></div>,
  },
  {
    title: "Archive Chat",
    icon: <ArchiveIcon />,
    component: <div></div>,
  },
  {
    title: "Account",
    icon: <AccountCircleIcon />,
  },
];

let preSelected = null;

export default function TabsChat({ onChangeLeftComponent }) {
  const [value, setValue] = React.useState(null);
  const [isOpenAccountPro5, setOpenAccountPro5] = React.useState(false);

  React.useEffect(() => {
    const firstItem = IconList[0];
    setValue(firstItem.icon);
    onChangeLeftComponent(firstItem.component);
  }, [onChangeLeftComponent]);

  const handleChange = (item) => {
    preSelected = value;

    setValue(item.icon);
    if (item.component) {
      onChangeLeftComponent(item.component);
    } else {
      setOpenAccountPro5(true);
    }
  };

  const _handleCloseModal = () => {
    setValue(preSelected);
    setOpenAccountPro5(false);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      borderBottom="1px solid #ddd"
      padding="16px 12px"
      margin="-8px -8px 0px -8px"
      sx={{
        backgroundColor: "white",
      }}
    >
      {IconList.map((item, index) => (
        <Tooltip key={index} title={item.title} arrow>
          <IconButton
            onClick={() => handleChange(item)}
            color={value === item.icon ? "primary" : "default"}
          >
            {item.icon}
          </IconButton>
        </Tooltip>
      ))}
      <AccountProfile open={isOpenAccountPro5} onClose={_handleCloseModal} />
    </Box>
  );
}
