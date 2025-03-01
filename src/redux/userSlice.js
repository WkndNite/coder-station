import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { editUser } from '../api/user';

export const updateUserInfoAsync = createAsyncThunk(
  'user/updateUserInfoAsync',
  async (payload, thunkApi) => {
    console.log(payload);
    await editUser(payload.userId, payload.newInfo);
    thunkApi.dispatch(updateUserInfo(payload.newInfo));
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    userInfo: {
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
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
          'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      };
    },
    updateUserInfo: (state, { payload }) => {
      for (let key in payload) {
        state.userInfo[key] = payload[key];
      }
    },
  },
});

export default userSlice.reducer;
export const { initUserInfo, changeLoginState, clearUserInfo, updateUserInfo } =
  userSlice.actions;
