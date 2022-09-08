import { configureStore } from "@reduxjs/toolkit";
import musicListReducer from "./features/musicSlice";
import template1Reducer from "./features/template1Slice";
import template2Reducer from "./features/template2Slice";

export const store = configureStore({
  reducer: {
    template1: template1Reducer,
    template2: template2Reducer,
    musicList: musicListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
