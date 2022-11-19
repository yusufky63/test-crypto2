import { createSlice } from "@reduxjs/toolkit";

export const orderHistorySlice = createSlice({
  name: "orders",
  initialState: {
    order: [],
  },
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const orde = (state) => state.orders.order;

export const { setOrder} = orderHistorySlice.actions;
