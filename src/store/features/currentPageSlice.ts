import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CurrentPageState = {
  id: number;
  template_number: number;
  scene_number: number;
  from: number;
  toggle: boolean;
};

const initialState: CurrentPageState = { template_number: 1, scene_number: 1, id: 1, from: 1, toggle: true };

export const currentPageSlice = createSlice({
  name: "currentPage",
  initialState,
  reducers: {
    updateCurrentPage: (state, action: PayloadAction<Omit<CurrentPageState, "toggle">>) => {
      state.template_number = action.payload.template_number;
      state.scene_number = action.payload.scene_number;
      state.id = action.payload.id;
      state.from = action.payload.from;
      state.toggle = !state.toggle;
    },
  },
});

export const selectAllCurrentPage = (state: RootState) => state.currentPage;
export const { updateCurrentPage } = currentPageSlice.actions;

export default currentPageSlice.reducer;
