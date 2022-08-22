import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

export type FirstPageState = {
  title: string;
  imageUrl: string;
};

const initialState: FirstPageState = {
  title: "This text is from Redux store!!!",
  imageUrl: "https://source.unsplash.com/random/200x200",
};

export const firstPageSlice = createSlice({
  name: "texts",
  initialState,
  reducers: {
    updateText: (state, action: PayloadAction<Pick<FirstPageState, "title">>) => {
      state.title = action.payload.title;
    },
  },
});

export const selectAllText = (state: RootState) => state.firstPage;
export const { updateText } = firstPageSlice.actions;

export default firstPageSlice.reducer;
