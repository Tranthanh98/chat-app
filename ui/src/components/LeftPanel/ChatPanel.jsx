import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  IconButton,
  InputBase,
  List,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useBoundStore } from "../../slices";
import UserChatItem from "./UserChatItem";

const SearchBox = styled("div")({
  padding: "4px",
  display: "flex",
  border: "1px solid #bdbdbd",
  borderRadius: "24px",
});

export default function ChatPanel() {
  // const { userId } = useBoundStore();
  // const [conversations, setConversations] = useState([]);
  const { conversations } = useBoundStore();

  // let { conversationId } = useParams();

  // const fetchingConversation = useCallback(() => {
  //   httpClient.sendGet(`/conversations`).then((res) => {
  //     const { data: conversationsData } = res;
  //     if (conversationsData?.length > 0) {
  //       conversationsData.forEach((element) => {
  //         element.participants = element.participants.filter(
  //           (i) => i._id !== userId
  //         );
  //       });
  //       setConversations(conversationsData);
  //       if (!conversationId) {
  //         setConversationId(conversationsData[0]?._id);
  //       }
  //     }
  //   });
  // }, [conversationId, setConversationId, userId]);

  // useEffect(() => {
  //   // fetchingConversation();

  //   socket.emit("joinUserRoom", userId);

  //   socket.on("newMessage", () => {
  //     fetchingConversation();
  //   });

  //   return () => {
  //     socket.off("newMessage");
  //   };
  // }, [fetchingConversation, userId]);

  return (
    <>
      <Box display={"flex"}>
        <Typography flex={1} variant="h6" fontWeight={600} p={1}>
          Chats
        </Typography>
        <Tooltip title="Create a new conversation">
          <IconButton color="primary">
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <SearchBox
        sx={{
          marginTop: 1,
          backgroundColor: "white",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px;",
        }}
      >
        <InputBase
          sx={{ paddingLeft: 1.7 }}
          placeholder="Search Here..."
          fullWidth
        />
        <IconButton type="button" sx={{ p: "4px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </SearchBox>
      <List>
        {conversations.map((conversationItem, index) => (
          <UserChatItem conversation={conversationItem} key={index} />
        ))}
      </List>
    </>
  );
}
