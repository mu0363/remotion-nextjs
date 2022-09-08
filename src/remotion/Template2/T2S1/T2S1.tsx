import { AbsoluteFill, Sequence } from "remotion";
import { T2S1_Text1 } from "./T2S1_Text1";
import type { FC } from "react";

type Props = {
  text: string;
};

/* @package **/
export const T2S1: FC<Props> = ({ text }) => {
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
