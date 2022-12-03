import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favori: [],
  },
  reducers: {
    setFavorites: (state, action) => {
      state.favori = action.payload;
    },
  },
});



export const { setFavorites } = favoritesSlice.actions;
