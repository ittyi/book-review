import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offset: 0,
};

export const paginationReducers = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    returnToTop: (state) => {
      state.offset = 0;
    },
    next: (state) => {
      state.offset += 10;
    },
    back: (state) => {
      if (state.offset > 10) {
        state.offset -= 10;
      } 
    },
  },
});

export const { returnToTop, next, back } = paginationReducers.actions;
