import { createSlice } from "@reduxjs/toolkit";

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
    toggleShowModal: (state) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleShowModal } = showModalSlice.actions;

export default showModalSlice.reducer;
