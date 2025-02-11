import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userInfo: {
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
    },
  },
  reducers: {
    initUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    changeLoginState: (state, { payload }) => {
      state.isLogin = payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = {
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
      };
    },
  },
});

export default userSlice.reducer;
export const { initUserInfo, changeLoginState, clearUserInfo } =
  userSlice.actions;
