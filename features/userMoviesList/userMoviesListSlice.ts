import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Movie } from "../../typings";

export interface userMoviesListState {
  value: Movie[] | undefined;
}

const initialState: userMoviesListState = {
  value: undefined,
};

export const userMoviesListSlice = createSlice({
  name: "userMoviesList",
  initialState,
  reducers: {
    setUserMoviesList: (state, action: PayloadAction<Movie[]>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserMoviesList } = userMoviesListSlice.actions;

export default userMoviesListSlice.reducer;
