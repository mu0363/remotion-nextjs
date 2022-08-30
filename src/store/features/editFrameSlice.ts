import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

export type EditFrameSlice = {
  id: number;
  template_number: number;
  scene_number: number;
  from: number;
  toggle: boolean;
};

const initialState: EditFrameSlice = { template_number: 1, scene_number: 1, id: 1, from: 1, toggle: true };

export const editFrameSlice = createSlice({
  name: "editFrame",
  initialState,
  reducers: {
    updateEditFrame: (state, action: PayloadAction<Omit<EditFrameSlice, "toggle">>) => {
      state.template_number = action.payload.template_number;
      state.scene_number = action.payload.scene_number;
      state.id = action.payload.id;
      state.from = action.payload.from;
      state.toggle = !state.toggle;
    },
  },
});

export const selectAllEditFrame = (state: RootState) => state.editFrame;
export const { updateEditFrame } = editFrameSlice.actions;

export default editFrameSlice.reducer;
