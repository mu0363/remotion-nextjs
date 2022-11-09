import { createSlice } from "@reduxjs/toolkit";
import { Template2DefaultProps } from "../../const";
import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SceneState } from "src/types";

export const template2Slice = createSlice({
  name: "template2",
  initialState: Template2DefaultProps,
  reducers: {
    updateT2Text: (states, action: PayloadAction<Pick<SceneState, "scene_number" | "id" | "text">>) => {
      const pageContents = states.sceneState.filter((state) => (state.scene_number = action.payload.scene_number));
      const content = pageContents.filter((pageContent) => pageContent.id === action.payload.id);
      content[0].text = action.payload.text;
    },
    updateT2Music: (states, action: PayloadAction<{ music: string }>) => {
      states.music = action.payload.music;
    },
  },
});

export const selectAllTemplate2Data = (state: RootState) => state.template2;
export const { updateT2Text, updateT2Music } = template2Slice.actions;

export default template2Slice.reducer;
