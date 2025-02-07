import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		isLogin: false,
		userInfo: {
			avatar:"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
		},
	},
	reducers: {
		initUserInfo: (state, { payload }) => {
			state.userInfo = payload;
		},
	},
});

export default userSlice.reducer;
export const { initUserInfo } = userSlice.actions;
