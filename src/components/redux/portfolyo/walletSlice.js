import { createSlice } from "@reduxjs/toolkit";

export const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    wallet: [],
  },
  reducers: {
    setWallet: (state, action) => {
      state.wallet = action.payload;
    },
  },
});

export const walle = (state) => state.wallet.wallet;

export const { setWallet} = walletSlice.actions;
