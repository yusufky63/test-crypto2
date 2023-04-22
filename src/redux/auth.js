import {createSlice} from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: {
    user: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = false;
    },
    auth2fa: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {login, logout,auth2fa} = auth.actions;
export default auth.reducer;
