import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ShowModalStatus {
  value: boolean;
}

const initialState: ShowModalStatus = {
  value: false,
};

export const showModalSlice = createSlice({
  name: "showModal",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setModal } = showModalSlice.actions;

export default showModalSlice.reducer;
