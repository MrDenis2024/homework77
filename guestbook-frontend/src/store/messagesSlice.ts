import {createSlice} from '@reduxjs/toolkit';
import {createMessage} from './messagesThunks';

export interface MessageState {
  createMessageLoading: boolean;
}

const initialState: MessageState = {
  createMessageLoading: false,
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
  },
  selectors: {
    selectorCreateMessageLoading: (state: MessageState) => state.createMessageLoading,
  },
});

export const messagesReducer = messagesSlice.reducer;
export const {
  selectorCreateMessageLoading,
} = messagesSlice.selectors;