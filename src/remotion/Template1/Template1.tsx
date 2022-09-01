import { useSetAtom, useAtomValue } from "jotai";
import { FC, useEffect } from "react";
import { Audio, interpolate, useCurrentFrame } from "remotion";
import { currentFrameAtom } from "../../libs/atom";
import { Watermark } from "../Watermark";
import { T1S1 } from "./T1S1";
import { T1S2 } from "./T1S2";
import { T1S3 } from "./T1S3";
import { musicAtom } from "src/libs/atom/atom";
import { SceneState } from "src/libs/store/features/template1Slice";

/** @package */
export const Template1: FC<SceneState[]> = (props) => {
  const setCurrentFrame = useSetAtom(currentFrameAtom);
  const music = useAtomValue(musicAtom);
  const frame = useCurrentFrame();

  useEffect(() => {
    setCurrentFrame(frame);
  }, [frame, setCurrentFrame]);

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
