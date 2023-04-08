import { createSlice } from "@reduxjs/toolkit";
import type { Movie } from "../../typings";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface currentMovieStatus {
  value: Movie | null;
}

const initialState: currentMovieStatus = {
  value: null,
};

export const currentMovieSlice = createSlice({
  name: "currentMovie",
  initialState,
  reducers: {
    setCurrentMovie: (state, action: PayloadAction<Movie>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentMovie } = currentMovieSlice.actions;

export default currentMovieSlice.reducer;
