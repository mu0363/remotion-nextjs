import { atom } from "jotai";

/** @package */
export const videConfigAtom = atom({ currentFrame: 0, fps: 30, width: 0, height: 0, durationInFrames: 0 });
export const isPlayingAtom = atom(false);
export const activeSceneAtom = atom({ template_number: 1, scene_number: 1, from: 1, toggle: true });
export const waveFormAtom = atom([0]);
export const currentMusicAtom = atom({
  id: 1,
  name: "Captured Memories",
  artist: "Marshall Usinger",
  time: "3:30",
  thumbnail: `https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/images/thumbnail/thumbnail_music_01.jpeg`,
  music: "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/music/music1.mp3",
});
