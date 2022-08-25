import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

export type PageState = { page: number; id: number; text: string; image: string };
export type Template1State = PageState[];

const initialState = [
  { page: 1, id: 1, text: "First Text from Redux", image: "https://source.unsplash.com/random/200x200" },
  { page: 1, id: 2, text: "Second Text from Redux", image: "https://source.unsplash.com/random/200x200" },
  { page: 1, id: 3, text: "Third Text from Redux", image: "https://source.unsplash.com/random/200x200" },
];

// FIXME: Mapを使いたい
// export type PageState = { id: number; text: string; image: string };
// export type Template1State = Map<string, PageState>;

// const pagesMap = new Map<string, { id: number; text: string; image: string }>([
//   ["page1", { id: 1, text: "First Text from Redux", image: "https://source.unsplash.com/random/200x200" }],
//   ["page2", { id: 2, text: "Second Text from Redux", image: "https://source.unsplash.com/random/200x200" }],
// ]);
// const initialState = pagesMap;

export const template1Slice = createSlice({
  name: "template1",
  initialState,
  reducers: {
    updateText: (states, action: PayloadAction<Pick<PageState, "page" | "id" | "text">>) => {
      const pageContents = states.filter((state) => (state.page = action.payload.page));
      const content = pageContents.find((pageContent) => pageContent.id === action.payload.id);
      if (content) {
        content.text = action.payload.text;
      }
    },
    updateImage: (states, action: PayloadAction<Pick<PageState, "page" | "id" | "image">>) => {
      const pageContents = states.filter((state) => (state.page = action.payload.page));
      const content = pageContents.find((pageContent) => pageContent.id === action.payload.id);
      if (content) {
        content.image = action.payload.image;
      }
    },
  },
});

export const selectAllTemplate1Data = (state: RootState) => state.template1;
export const { updateText, updateImage } = template1Slice.actions;

export default template1Slice.reducer;
