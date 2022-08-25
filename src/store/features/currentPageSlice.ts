import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CurrentPageState = { template: number; page: number; id: number; frame: number };

const initialState: CurrentPageState = { template: 1, page: 1, id: 1, frame: 1 };

export const currentPageSlice = createSlice({
  name: "currentPage",
  initialState,
  reducers: {
    updateCurrentPage: (state, action: PayloadAction<CurrentPageState>) => {
      state.template = action.payload.template;
      state.page = action.payload.page;
    },
  },
});

export const selectAllCurrentPage = (state: RootState) => state.currentPage;
export const { updateCurrentPage } = currentPageSlice.actions;

export default currentPageSlice.reducer;
