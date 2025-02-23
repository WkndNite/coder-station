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
    issueTypeId: "all",
    bookTypeId: "all",
  },
  reducers: {
    updateIssueTypeId(state, { payload }) {
      state.issueTypeId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTypeList.fulfilled, (state, action) => {
      state.typeList = action.payload;
    });
  },
});

export default typeSlice.reducer;
export const { updateIssueTypeId } = typeSlice.actions;
