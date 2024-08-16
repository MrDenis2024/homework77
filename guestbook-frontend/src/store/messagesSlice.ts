import {createSlice} from '@reduxjs/toolkit';
import {createMessage, fetchMessages} from './messagesThunks';
import {IMessage} from '../types';

export interface MessageState {
  createMessageLoading: boolean;
  fetchLoading: boolean;
  messages: IMessage[];
}

const initialState: MessageState = {
  createMessageLoading: false,
  fetchLoading: false,
  messages: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createMessage.pending, (state: MessageState) => {
      state.createMessageLoading = true;
    }).addCase(createMessage.fulfilled, (state: MessageState) => {
      state.createMessageLoading = false;
    }).addCase(createMessage.rejected, (state: MessageState) => {
      state.createMessageLoading = false;
    });

    builder.addCase(fetchMessages.pending, (state: MessageState) => {
      state.fetchLoading = true;
    }).addCase(fetchMessages.fulfilled, (state: MessageState, {payload: messages}) => {
      state.fetchLoading = false;
      state.messages = messages;
    }).addCase(fetchMessages.rejected, (state: MessageState) => {
      state.fetchLoading = false;
    });
  },
  selectors: {
    selectorCreateMessageLoading: (state: MessageState) => state.createMessageLoading,
    selectorFetchLoading: (state: MessageState) => state.fetchLoading,
    selectorMessages: (state: MessageState) => state.messages,
  },
});

export const messagesReducer = messagesSlice.reducer;
export const {
  selectorCreateMessageLoading,
  selectorFetchLoading,
  selectorMessages,
} = messagesSlice.selectors;