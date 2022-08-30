import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { defaultProps } from "src/libs/const";

export type PageState = { scene_number: number; id: number; text: string; image_url: string };
export type Template1State = PageState[];

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
  initialState: defaultProps,
  reducers: {
    updateText: (states, action: PayloadAction<Pick<PageState, "scene_number" | "id" | "text">>) => {
      const pageContents = states.filter((state) => (state.scene_number = action.payload.scene_number));
      const content = pageContents.find((pageContent) => pageContent.id === action.payload.id);
      if (content) {
        content.text = action.payload.text;
      }
    },
    updateImage: (states, action: PayloadAction<Pick<PageState, "scene_number" | "id" | "image_url">>) => {
      const pageContents = states.filter((state) => (state.scene_number = action.payload.scene_number));
      const content = pageContents.find((pageContent) => pageContent.id === action.payload.id);
      if (content) {
        content.image_url = action.payload.image_url;
      }
    },
  },
});

export const selectAllTemplate1Data = (state: RootState) => state.template1;
export const { updateText, updateImage } = template1Slice.actions;

export default template1Slice.reducer;
