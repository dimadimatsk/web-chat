import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userLogged: false,
  displayName: null,
  uid: null,
  email: null,
  accessToken: null,
  photoURL: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userLogged = !!action.payload.email;
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.photoURL = action.payload.photoURL;
    },
    logoutUser(state) {
      state.userLogged = false;
      state.displayName = null;
      state.uid = null;
      state.email = null;
      state.accessToken = null;
      state.photoURL = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
