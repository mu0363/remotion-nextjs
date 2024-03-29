import { atom } from "jotai";

import type { SelectedTemplateType } from "src/types";

/** @package */
export const videConfigAtom = atom({ currentFrame: 0, fps: 30, width: 0, height: 0, durationInFrames: 0 });
export const isPlayingAtom = atom(false);
export const playingMusicIdAtom = atom(0);
export const activeSceneAtom = atom({ template_number: 1, scene_number: 1, from: 1, toggle: true });
export const waveFormAtom = atom([0]);
export const selectedTemplateAtom = atom<SelectedTemplateType>("template01");
