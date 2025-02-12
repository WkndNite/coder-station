import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTypes } from "../api/type";

export const getTypeList = createAsyncThunk("type/getTypeList", async () => {
	const response = await getTypes();
	return response.data;
});

export const typeSlice = createSlice({
	name: "type",
	initialState: {
		typeList: [],
	},
	reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTypeList.fulfilled, (state, action) => {
                state.typeList = action.payload;
            });
    }
});

export default typeSlice.reducer;
export const {} = typeSlice.actions;
