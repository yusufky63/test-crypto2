import { configureStore } from "@reduxjs/toolkit";
import { favoritesSlice } from "./favorite/favoriteSlice";
import { portfolyoSlice } from "./portfolyo/portfolyoSlice";
import auth from "./auth";
import modal from "./modal";
export const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
    portfolios: portfolyoSlice.reducer,
    auth,
    modal,
  },
});
