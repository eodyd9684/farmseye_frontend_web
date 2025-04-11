import { configureStore } from "@reduxjs/toolkit";
import todaySlice from "./todaySlice";

export const store = configureStore({
  reducer : {
    today : todaySlice.reducer,
  }
});