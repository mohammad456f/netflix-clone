import { configureStore } from "@reduxjs/toolkit";
import loginStatusReducer from "../features/loginStatus/loginStatusSlice";
import showModalReducer from "../features/showModal/showModalSlice";
import currentMovieReducer from "../features/currentMovie/currentMovieSlice";
import userMoviesListReducer from "../features/userMoviesList/userMoviesListSlice";

export const store = configureStore({
  reducer: {
    loginStatus: loginStatusReducer,
    showModal: showModalReducer,
    currentMovie: currentMovieReducer,
    userMoviesList: userMoviesListReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
