import { configureStore } from "@reduxjs/toolkit";
import currentFrameReducer from "./features/currentFrameSlice";
import currentPageReducer from "./features/currentSceneSlice";
import template1Reducer from "./features/template1Slice";

export const store = configureStore({
  reducer: {
    template1: template1Reducer,
    currentPage: currentPageReducer,
    currentFrame: currentFrameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
