import {createAsyncThunk} from '@reduxjs/toolkit';
import {IMessage, MessageMutation} from '../types';
import axiosApi from '../axiosApi';

export const createMessage = createAsyncThunk<void, MessageMutation>('messages/create', async (newMessage) => {
  const formData = new FormData();
  formData.append('author', newMessage.author);
  formData.append('message', newMessage.message);

  if (newMessage.image) {
    formData.append('image', newMessage.image);
  }

  await axiosApi.post('/messages', formData);
});

export const fetchMessages = createAsyncThunk<IMessage[]>('messages/fetch', async () => {
  const {data: messages} = await axiosApi.get<IMessage[]>('/messages');
  return messages.reverse();
});