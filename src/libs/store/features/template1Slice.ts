import { createSlice } from "@reduxjs/toolkit";
import { Template1DefaultProps } from "../../const";
import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SceneState } from "src/types";

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
  initialState: Template1DefaultProps,
  reducers: {
    updateT1Text: (states, action: PayloadAction<Pick<SceneState, "scene_number" | "id" | "text">>) => {
      const pageContents = states.sceneState.filter((state) => (state.scene_number = action.payload.scene_number));
      const content = pageContents.filter((pageContent) => pageContent.id === action.payload.id);
      content[0].text = action.payload.text;
    },
    updateImage: (states, action: PayloadAction<Pick<SceneState, "scene_number" | "id" | "image_url">>) => {
      const pageContents = states.sceneState.filter((state) => (state.scene_number = action.payload.scene_number));
      const content = pageContents.filter((pageContent) => pageContent.id === action.payload.id);
      content[0].image_url = action.payload.image_url;
    },
    updateT1Music: (states, action: PayloadAction<{ music: string }>) => {
      states.music = action.payload.music;
    },
  },
});

export const selectAllTemplate1Data = (state: RootState) => state.template1;
export const { updateT1Text, updateImage, updateT1Music } = template1Slice.actions;

export default template1Slice.reducer;
