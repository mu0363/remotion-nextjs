import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CurrentPageState = { template: number; page: number; id: number; from: number; toggle: boolean };

const initialState: CurrentPageState = { template: 1, page: 1, id: 1, from: 1, toggle: true };

export const currentPageSlice = createSlice({
  name: "currentPage",
  initialState,
  reducers: {
    updateCurrentPage: (state, action: PayloadAction<Omit<CurrentPageState, "toggle">>) => {
      state.template = action.payload.template;
      state.page = action.payload.page;
      state.id = action.payload.id;
      state.from = action.payload.from;
      state.toggle = !state.toggle;
    },
  },
});

export const selectAllCurrentPage = (state: RootState) => state.currentPage;
export const { updateCurrentPage } = currentPageSlice.actions;

export default currentPageSlice.reducer;
