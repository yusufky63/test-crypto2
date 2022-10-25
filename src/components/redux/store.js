import { configureStore } from "@reduxjs/toolkit";
import { favoritesSlice } from "./favorite/favoriteSlice";
import auth from "./auth";
import modal from "./modal";
export const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
    auth,
    modal,
  },
});
