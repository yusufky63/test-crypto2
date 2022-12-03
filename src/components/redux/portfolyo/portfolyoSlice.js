import { createSlice } from "@reduxjs/toolkit";

export const portfolyoSlice = createSlice({
  name: "portfolios",
  initialState: {
    portfolyo: [],
  },
  reducers: {
    setPortfolyo: (state, action) => {
      state.portfolyo = action.payload;
    },
  },
});



export const { setPortfolyo } = portfolyoSlice.actions;
