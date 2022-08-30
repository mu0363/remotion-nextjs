import { configureStore } from "@reduxjs/toolkit";
import currentFrameReducer from "./features/currentFrameSlice";
import editFrameReducer from "./features/editFrameSlice";
import template1Reducer from "./features/template1Slice";

export const store = configureStore({
  reducer: {
    template1: template1Reducer,
    editFrame: editFrameReducer,
    currentFrame: currentFrameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
