import { createSlice } from "@reduxjs/toolkit";
import { Template1DefaultProps } from "../../const";
import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SceneState } from "types";

export const template2Slice = createSlice({
  name: "template1",
  initialState: Template1DefaultProps,
  reducers: {
    updateText: (states, action: PayloadAction<Pick<SceneState, "scene_number" | "id" | "text">>) => {
      const pageContents = states.sceneState.filter((state) => (state.scene_number = action.payload.scene_number));
      const content = pageContents.filter((pageContent) => pageContent.id === action.payload.id);
      content[0].text = action.payload.text;
    },
    updateImage: (states, action: PayloadAction<Pick<SceneState, "scene_number" | "id" | "image_url">>) => {
      const pageContents = states.sceneState.filter((state) => (state.scene_number = action.payload.scene_number));
      const content = pageContents.filter((pageContent) => pageContent.id === action.payload.id);
      content[0].image_url = action.payload.image_url;
    },
    updateMusic: (states, action: PayloadAction<{ music: string }>) => {
      states.music = action.payload.music;
    },
  },
});

export const selectAllTemplate1Data = (state: RootState) => state.template2;
export const { updateText, updateImage, updateMusic } = template2Slice.actions;

export default template2Slice.reducer;
