import { configureStore } from "@reduxjs/toolkit";
import todaySlice from './todaySlice'
import authSlice from "./authSlice";

export const store = configureStore({
  reducer : {
    today : todaySlice.reducer,
    auth : authSlice.reducer
  }
});