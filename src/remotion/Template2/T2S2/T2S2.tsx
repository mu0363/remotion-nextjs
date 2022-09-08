import { Sequence } from "remotion";
import { T2S2_Text1 } from "./T2S2_Text1";
import type { FC } from "react";

type Props = {
  text: string;
};

/* @package **/
export const T2S2: FC<Props> = ({ text }) => {
  return (
    <Sequence from={200} durationInFrames={320}>
      <T2S2_Text1 text={text} />
    </Sequence>
  );
};
