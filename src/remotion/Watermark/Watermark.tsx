import { Img, Sequence } from "remotion";
import type { FC } from "react";

/** @package */
export const Watermark: FC<{ watermark: string }> = ({ watermark }) => {
  return (
    <Sequence from={0} durationInFrames={360}>
      <Img src={watermark} alt="avatar" className="z-20 h-[1080px] w-[1920px] object-cover opacity-30" />
    </Sequence>
  );
};
