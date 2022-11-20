import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatId: 'null',
  user: {},
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat(state, action) {
      state.chatId = action.payload.chatId;
      state.user = action.payload.user;
    },
  },
});

export const { setChat } = chatSlice.actions;
export default chatSlice.reducer;
