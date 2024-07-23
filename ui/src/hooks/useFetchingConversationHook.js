import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBoundStore } from "../slices";
import * as httpClient from "../utils/httpClient";
import socket from "../utils/sockerioService";

export default function useFetchingConversationHook() {
  const { setConversations, setConversationId, userId } = useBoundStore();

  let { conversationId } = useParams();

  const fetchingConversation = useCallback(() => {
    httpClient.sendGet(`/conversations`).then((res) => {
      const { data: conversationsData } = res;
      if (conversationsData?.length > 0) {
        conversationsData.forEach((element) => {
          element.participants = element.participants.filter(
            (i) => i._id !== userId
          );
        });
        setConversations(conversationsData);
        if (!conversationId) {
          setConversationId(conversationsData[0]?._id);
        }
      }
    });
  }, [conversationId, setConversationId, setConversations, userId]);

  useEffect(() => {
    fetchingConversation();

    socket.emit("joinUserRoom", userId);

    socket.on("newMessage", () => {
      fetchingConversation();
    });

    return () => {
      socket.off("newMessage");
    };
  }, [fetchingConversation, userId]);

  return {
    fetchingConversation,
  };
}
