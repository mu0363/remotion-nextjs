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
  name: "firstPage",
  initialState,
  reducers: {
    updateText: (state, action: PayloadAction<Pick<FirstPageState, "title">>) => {
      state.title = action.payload.title;
    },
    updateImage: (state, action: PayloadAction<Pick<FirstPageState, "imageUrl">>) => {
      state.imageUrl = action.payload.imageUrl;
    },
  },
});

export const selectAllFirstPageData = (state: RootState) => state.firstPage;
export const { updateText, updateImage } = firstPageSlice.actions;

export default firstPageSlice.reducer;
