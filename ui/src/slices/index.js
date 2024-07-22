import { create } from "zustand";
import { createUserInfoSlice } from "./userInfoSlice";
import { createConversationSlice } from "./conversationSlice";

export const useBoundStore = create((set, get) => ({
  ...createUserInfoSlice(set, get),
  ...createConversationSlice(set),
}));
