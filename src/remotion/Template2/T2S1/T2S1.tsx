import { AbsoluteFill, Sequence } from "remotion";
import { T2S1_Text1 } from "./T2S1_Text1";
import type { FC } from "react";
import { SceneState } from "types";

type Props = {
  sceneState: SceneState;
};

/* @package **/
export const T2S1: FC<Props> = ({ sceneState }) => {
  const { text } = sceneState;

  return (
    <Sequence from={40} durationInFrames={170}>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <T2S1_Text1 text={text} />
      </AbsoluteFill>
    </Sequence>
  );
};
