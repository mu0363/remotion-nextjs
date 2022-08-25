import { configureStore } from "@reduxjs/toolkit";
import currentPageReducer from "./features/currentPageSlice";
import template1Reducer from "./features/template1Slice";

export const store = configureStore({
  reducer: {
    template1: template1Reducer,
    currentPage: currentPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
