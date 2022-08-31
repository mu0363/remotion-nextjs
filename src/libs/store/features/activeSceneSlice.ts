import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ActiveSceneSlice = {
  template_number: number;
  scene_number: number;
  from: number;
  toggle: boolean;
};

const initialState: ActiveSceneSlice = { template_number: 1, scene_number: 1, from: 1, toggle: true };

export const activeSceneSlice = createSlice({
  name: "activeScene",
  initialState,
  reducers: {
    updateActiveScene: (state, action: PayloadAction<Omit<ActiveSceneSlice, "toggle">>) => {
      state.template_number = action.payload.template_number;
      state.scene_number = action.payload.scene_number;
      state.from = action.payload.from;
      state.toggle = !state.toggle;
    },
  },
});

export const selectAllActiveScene = (state: RootState) => state.activeScene;
export const { updateActiveScene } = activeSceneSlice.actions;

export default activeSceneSlice.reducer;
