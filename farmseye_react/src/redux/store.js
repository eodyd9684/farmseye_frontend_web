import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";

export const store = configureStore({
  reducer : {
    today : todaySlice.reducer,
    auth : authSlice.reducer
  }
});