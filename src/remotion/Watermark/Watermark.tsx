import { Sequence } from "remotion";
import type { FC } from "react";

/** @package */
export const Watermark: FC = () => {
  return (
    <Sequence from={0} durationInFrames={360}>
      <div className="z-10 p-10 text-6xl font-bold text-gray-600/40">AVANT CREATIVE</div>
    </Sequence>
  );
};
