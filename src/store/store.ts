import { configureStore } from "@reduxjs/toolkit";
import firstPageReducer from "./features/firstPageSlice";

export const store = configureStore({
  reducer: {
    firstPage: firstPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
