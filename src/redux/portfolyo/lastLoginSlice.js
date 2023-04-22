import { createSlice } from "@reduxjs/toolkit";

export const lastLoginSlice = createSlice({
  name: "lastLogins",
  initialState: {
    lastLogin: [],
  },
  reducers: {
    setLastLogin: (state, action) => {
      state.lastLogin = action.payload;
    },
  },
});



export const { setLastLogin} = lastLoginSlice.actions;
