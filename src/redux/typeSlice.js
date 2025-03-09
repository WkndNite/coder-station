import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTypes } from '../api/type';

export const getTypeList = createAsyncThunk('type/getTypeList', async () => {
  const { data } = await getTypes();
  console.log(data);
  return data;
});

export const typeSlice = createSlice({
  name: 'type',
  initialState: {
    typeList: [],
    issueTypeId: 'all',
    bookTypeId: 'all',
  },
  reducers: {
    initTypeList(state, { payload }) {
      state.typeList = payload;
    },
    updateIssueTypeId(state, { payload }) {
      state.issueTypeId = payload;
    },
    updateBookTypeId(state, { payload }) {
      state.bookTypeId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTypeList.fulfilled, (state, action) => {
      state.typeList = action.payload;
    });
  },
});

export default typeSlice.reducer;
export const { updateIssueTypeId, updateBookTypeId } = typeSlice.actions;
