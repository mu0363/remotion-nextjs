import { Sequence, AbsoluteFill } from "remotion";
import { Subtitle } from "./Subtitle";
import { T1S3_Image1 } from "./T1S3_Image1";
import { T1S3_Text1 } from "./T1S3_Text1";
import type { FC } from "react";
import { PageState } from "src/store/features/template1Slice";

/* @package **/
export const T1S3: FC<{ props: PageState }> = ({ props }) => {
  const { text, image } = props;

  return (
    <Sequence from={240} durationInFrames={240}>
      <AbsoluteFill
        style={{
          background: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <T1S3_Image1 image={image} />
        <T1S3_Text1 text={text} />
        <Subtitle />
      </AbsoluteFill>
    </Sequence>
  );
};
