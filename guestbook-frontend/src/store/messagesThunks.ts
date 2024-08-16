import {createAsyncThunk} from '@reduxjs/toolkit';
import {MessageMutation} from '../types';
import axiosApi from '../axiosApi';

export const createMessage = createAsyncThunk<void, MessageMutation>('message/create', async (newMessage) => {
  const formData = new FormData();
  formData.append('author', newMessage.author);
  formData.append('message', newMessage.message);

  if (newMessage.image) {
    formData.append('image', newMessage.image);
  }

  await axiosApi.post('/messages', formData);
});