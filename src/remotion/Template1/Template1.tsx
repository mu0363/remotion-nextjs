import { useSetAtom, useAtomValue } from "jotai";
import { FC, useEffect } from "react";
import { Audio, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { videConfigAtom } from "../../libs/atom";
import { musicAtom } from "../../libs/atom/";
import { Watermark } from "../Watermark";
import { T1S1 } from "./T1S1";
import { T1S2 } from "./T1S2";
import { T1S3 } from "./T1S3";
import type { SceneState } from "types";

/** @package */
export const Template1: FC<SceneState[]> = (props) => {
  const setVideoConfigFrame = useSetAtom(videConfigAtom);
  const music = useAtomValue(musicAtom);
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  useEffect(() => {
    setVideoConfigFrame({ currentFrame: frame, fps, width, height });
  }, [frame, fps, width, height, setVideoConfigFrame]);

  return (
    <>
      <Audio
        src={music}
        volume={interpolate(frame, [170, 360], [1, 0], {
          extrapolateLeft: "clamp",
        })}
      />
      <Watermark />
      <T1S1 sceneState={props[0]} />
      <T1S2 sceneState={props[1]} />
      <T1S3 sceneState={props[2]} />
    </>
  );
};
