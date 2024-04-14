import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { paginationReducers } from "./paginationReducer";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    pagination: paginationReducers.reducer,
  },
});