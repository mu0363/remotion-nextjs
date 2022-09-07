import { configureStore } from "@reduxjs/toolkit";
import musicListReducer from "./features/musicSlice";
import template1Reducer from "./features/template1Slice";

export const store = configureStore({
  reducer: {
    template1: template1Reducer,
    musicList: musicListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
