import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";
type CurrentFrameState = { currentFrame: number };
const initialState: CurrentFrameState = { currentFrame: 0 };

export const currentFrameSlice = createSlice({
  name: "currentFrame",
  initialState,
  reducers: {
    updateCurrentFrame: (state, action: PayloadAction<CurrentFrameState>) => {
      state.currentFrame = action.payload.currentFrame;
    },
  },
});

export const selectCurrentFrame = (state: RootState) => state.currentFrame;
export const { updateCurrentFrame } = currentFrameSlice.actions;

export default currentFrameSlice.reducer;
