export const createUserInfoSlice = (set, get) => ({
  userInfo: null,
  userId: null,
  setUserInfo: (userInfo) => {
    set({ userInfo });
    set({ userId: userInfo.userId });
  },
  clearUserInfo: () => {
    localStorage.removeItem("token");
    set({ userInfo: null });
    set({ userId: null });
  },
});
