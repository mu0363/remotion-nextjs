import { Watermark } from "../Watermark";
import { T1S1 } from "./T1S1";
import { T1S2 } from "./T1S2";
import { T1S3 } from "./T1S3";
import type { FC } from "react";
import { SceneState } from "src/libs/store/features/template1Slice";

/** @package */
export const Template1: FC<SceneState[]> = (props) => {
  // const dispatch = useDispatch();
  // const frame = useCurrentFrame();

  // useEffect(() => {
  //   dispatch(updateCurrentFrame({ currentFrame: frame }));
  // }, [frame, dispatch]);
  return (
    <>
      <Watermark />
      <T1S1 sceneState={props[0]} />
      <T1S2 sceneState={props[1]} />
      <T1S3 sceneState={props[2]} />
    </>
  );
};
