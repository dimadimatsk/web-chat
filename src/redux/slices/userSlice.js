import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nickName: null,
  userId: null,
  email: null,
  token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.nickName = action.payload.nickName;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logoutUser(state) {
      state.nickName = null;
      state.userId = null;
      state.email = null;
      state.token = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
