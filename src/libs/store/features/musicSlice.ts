import { createSlice } from "@reduxjs/toolkit";
import { musicList } from "../../const";
import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MusicState } from "types";

export const musicSlice = createSlice({
  name: "musicList",
  initialState: musicList,
  reducers: {
    updateMusicList: (states, action: PayloadAction<Pick<MusicState, "id">>) =>
      states.forEach((data) => {
        if (data.id === action.payload.id) {
          data.isSelected = true;
        } else {
          data.isSelected = false;
        }
      }),
  },
});

export const selectAllMusicSliceData = (state: RootState) => state.musicList;
export const selectCurrentMusicSliceData = (state: RootState) => {
  const selectedMusic = state.musicList.filter((musicData) => musicData.isSelected === true);
  return selectedMusic[0];
};
export const { updateMusicList } = musicSlice.actions;

export default musicSlice.reducer;
