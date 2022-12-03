import { configureStore } from "@reduxjs/toolkit";
import { favoritesSlice } from "./favorite/favoriteSlice";
import { portfolyoSlice } from "./portfolyo/portfolyoSlice";
import { orderHistorySlice } from "./portfolyo/orderHistorySlice";
import { walletSlice } from "./portfolyo/walletSlice";
import auth from "./auth";

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
    portfolios: portfolyoSlice.reducer,
    orders: orderHistorySlice.reducer,
    auth,
    wallet: walletSlice.reducer,
  },
});
