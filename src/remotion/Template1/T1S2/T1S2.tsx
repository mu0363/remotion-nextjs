import { Sequence, AbsoluteFill } from "remotion";
import { T1S2_Text1 } from "./T1S2_Text1";
import { T1S2_Video } from "./T1S2_Video";
import type { FC } from "react";
import type { SceneState } from "src/types";

type Props = {
  sceneState: SceneState;
};

/* @package **/
export const T1S2: FC<Props> = ({ sceneState }) => {
  const { text, image_url } = sceneState;

  return (
    <Sequence from={120} durationInFrames={120}>
      <AbsoluteFill
        style={{
          background: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {image_url !== undefined && <T1S2_Video image={image_url} />}
        <T1S2_Text1 text={text} />
      </AbsoluteFill>
    </Sequence>
  );
};
