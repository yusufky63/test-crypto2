
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admins: [],
};

export const adminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    setAdmins: (state, action) => {
      state.admins = action.payload;
    },
  },
});

export const { setAdmins } = adminsSlice.actions;
export default adminsSlice.reducer;