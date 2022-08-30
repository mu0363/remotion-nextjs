import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CurrentSceneState = {
  id: number;
  template_number: number;
  scene_number: number;
  from: number;
  toggle: boolean;
};

const initialState: CurrentSceneState = { template_number: 1, scene_number: 1, id: 1, from: 1, toggle: true };

export const currentSceneSlice = createSlice({
  name: "currentScene",
  initialState,
  reducers: {
    updateCurrentScene: (state, action: PayloadAction<Omit<CurrentSceneState, "toggle">>) => {
      state.template_number = action.payload.template_number;
      state.scene_number = action.payload.scene_number;
      state.id = action.payload.id;
      state.from = action.payload.from;
      state.toggle = !state.toggle;
    },
  },
});

export const selectAllCurrentScene = (state: RootState) => state.currentScene;
export const { updateCurrentScene } = currentSceneSlice.actions;

export default currentSceneSlice.reducer;
