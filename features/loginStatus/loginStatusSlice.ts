import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginStatusState {
  value: { isLoggedIn: boolean; userId: string };
}

const initialState: LoginStatusState = {
  value: { isLoggedIn: false, userId: "" },
};

export const loginStatusSlice = createSlice({
  name: "loginStatus",
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<string>) => {
      state.value = { isLoggedIn: true, userId: action.payload };
    },
    userLogout: (state) => {
      state.value = { isLoggedIn: false, userId: "" };
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLogin, userLogout } = loginStatusSlice.actions;

export default loginStatusSlice.reducer;
