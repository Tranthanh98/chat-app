export const createConversationSlice = (set) => ({
  conversationId: null,
  conversations: [],
  setConversationId: (conversationId) => set({ conversationId }),
  setConversations: (conversations) => set({ conversations }),
});
