import { useSetAtom } from "jotai";
import { FC, useEffect } from "react";
import { Audio, interpolate, useCurrentFrame, useVideoConfig, Video } from "remotion";
import { videConfigAtom } from "../../libs/atom";
import { Watermark } from "../Watermark";
import { T2S1 } from "./T2S1";
import { T2S2 } from "./T2S2";
import type { Template1Type } from "src/types";

/** @package */
export const Template2: FC<Template1Type> = (props) => {
  const setVideoConfigFrame = useSetAtom(videConfigAtom);
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();
  const { music, watermark, sceneState } = props;

  useEffect(() => {
    setVideoConfigFrame({ currentFrame: frame, fps, width, height, durationInFrames });
  }, [frame, fps, width, height, setVideoConfigFrame, durationInFrames]);

  return (
    <>
      <Audio src={music} volume={(f) => interpolate(f, [170, 360], [1, 0], { extrapolateLeft: "clamp" })} />
      <Watermark watermark={watermark} />
      <T2S1 sceneState={sceneState[0]} />
      <T2S2 sceneState={sceneState[1]} />
      <Video src="https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/videos/AWARDS_OPENER.mp4" />
    </>
  );
};
