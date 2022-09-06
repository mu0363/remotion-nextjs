import { useSetAtom } from "jotai";
import { FC, useEffect } from "react";
import { Audio, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { videConfigAtom } from "../../libs/atom";
import { Watermark } from "../Watermark";
import { T1S1 } from "./T1S1";
import { T1S2 } from "./T1S2";
import { T1S3 } from "./T1S3";
import type { Template1Type } from "types";

/** @package */
export const Template1: FC<Template1Type> = (props) => {
  const setVideoConfigFrame = useSetAtom(videConfigAtom);
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();
  const { music, watermark, sceneState } = props;

  useEffect(() => {
    setVideoConfigFrame({ currentFrame: frame, fps, width, height, durationInFrames });
  }, [frame, fps, width, height, setVideoConfigFrame, durationInFrames]);

  return (
    <>
      <Audio src={music} volume={(_f) => interpolate(frame, [170, 360], [1, 0], { extrapolateLeft: "clamp" })} />
      <Watermark watermark={watermark} />
      <T1S1 sceneState={sceneState[0]} />
      <T1S2 sceneState={sceneState[1]} />
      <T1S3 sceneState={sceneState[2]} />
    </>
  );
};
