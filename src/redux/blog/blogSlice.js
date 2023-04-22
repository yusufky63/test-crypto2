import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blog: [],
  },
  reducers: {
    setBlog: (state, action) => {
      state.blog = action.payload;
    },
  },
});



export const { setBlog} = blogSlice.actions;
