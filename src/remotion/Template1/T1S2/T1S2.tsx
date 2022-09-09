import { Sequence, AbsoluteFill } from "remotion";
import { Subtitle } from "./Subtitle";
import { T1S2_Image1 } from "./T1S2_Image1";
import { T1S2_Text1 } from "./T1S2_Text1";
import type { FC } from "react";
import type { SceneState } from "types";

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
        {image_url !== undefined && <T1S2_Image1 image={image_url} />}
        <T1S2_Text1 text={text} />
        <Subtitle />
      </AbsoluteFill>
    </Sequence>
  );
};
