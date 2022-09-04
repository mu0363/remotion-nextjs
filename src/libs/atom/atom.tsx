import { atom } from "jotai";

/** @package */
export const videConfigAtom = atom({ currentFrame: 0, fps: 30, width: 0, height: 0 });
export const isPlayingAtom = atom(false);
export const activeSceneAtom = atom({ template_number: 1, scene_number: 1, from: 1, toggle: true });
export const musicAtom = atom("https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/images/music1.mp3");
