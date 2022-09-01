import { atom } from "jotai";

/** @package */
export const currentFrameAtom = atom(0);
export const isPlayingAtom = atom(false);
export const activeSceneAtom = atom({ template_number: 1, scene_number: 1, from: 1, toggle: true });
