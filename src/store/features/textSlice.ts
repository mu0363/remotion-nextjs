import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TextsState = {
  firstText: string;
};

const initialState: TextsState = {
  firstText: "This text is from Redux store!!!",
};

export const textSlice = createSlice({
  name: "texts",
  initialState,
  reducers: {
    updateText: (state, action: PayloadAction<Pick<TextsState, "firstText">>) => {
      state.firstText = action.payload.firstText;
    },
  },
});

export const selectAllText = (state: RootState) => state.texts;
export const { updateText } = textSlice.actions;

export default textSlice.reducer;
