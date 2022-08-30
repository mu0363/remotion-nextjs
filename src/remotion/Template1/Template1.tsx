import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCurrentFrame } from "remotion";
import { updateCurrentFrame } from "../../store/features/currentFrameSlice";
import { T1S1 } from "./T1S1";
import { T1S2 } from "./T1S2";
import { T1S3 } from "./T1S3";
import { Template1State } from "src/store/features/template1Slice";

/** @package */
export const Template1: FC<Template1State> = (props) => {
  const dispatch = useDispatch();
  const frame = useCurrentFrame();

  useEffect(() => {
    dispatch(updateCurrentFrame({ currentFrame: frame }));
  }, [frame, dispatch]);
  return (
    <>
      <T1S1 sceneState={props[0]} />
      <T1S2 sceneState={props[1]} />
      <T1S3 sceneState={props[2]} />
    </>
  );
};
