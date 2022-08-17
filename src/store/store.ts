import { configureStore } from "@reduxjs/toolkit";
import textReducer from "./features/textSlice";

export const store = configureStore({
  reducer: {
    texts: textReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
