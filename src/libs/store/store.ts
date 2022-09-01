import { configureStore } from "@reduxjs/toolkit";
import activeSceneReducer from "./features/activeSceneSlice";
import template1Reducer from "./features/template1Slice";

export const store = configureStore({
  reducer: {
    template1: template1Reducer,
    activeScene: activeSceneReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
