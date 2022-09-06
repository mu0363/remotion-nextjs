import { Sequence, AbsoluteFill } from "remotion";
import { T1S1_Image1 } from "./T1S1_Image1";
import { T1S1_Text1 } from "./T1S1_Text1";
import type { FC } from "react";
import type { SceneState } from "types";

type Props = {
  sceneState: SceneState;
};

/* @package **/
export const T1S1: FC<Props> = ({ sceneState }) => {
  const { text, image_url } = sceneState;

  return (
    <Sequence from={0} durationInFrames={120}>
      <AbsoluteFill
        style={{
          background: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <T1S1_Image1 image={image_url} />
        <T1S1_Text1 text={text} />
      </AbsoluteFill>
    </Sequence>
  );
};
