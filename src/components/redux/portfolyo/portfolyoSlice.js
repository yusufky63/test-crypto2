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

export const portf = (state) => state.portfolios.favori;

export const { setPortfolyo } = portfolyoSlice.actions;
