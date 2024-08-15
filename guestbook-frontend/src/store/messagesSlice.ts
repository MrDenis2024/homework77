import {createSlice} from '@reduxjs/toolkit';

export interface MessageState {
  createMessageLoading: boolean;
}

export const initialState: MessageState = {
  createMessageLoading: false,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
});

export const messagesReducer = messagesSlice.reducer;