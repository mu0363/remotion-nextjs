import { Sequence } from "remotion";
import type { FC } from "react";

/** @package */
export const Watermark: FC = () => {
  return (
    <Sequence from={0} durationInFrames={360}>
      <div className="flex flex-col space-y-4">
        <div className="z-50 px-10 pt-10 text-6xl font-bold text-gray-600/40">AVANT CREATIVE</div>
        <p className="z-50 px-10 text-3xl font-bold text-gray-600/40">これは複製防止のウォーターマークです。</p>
        <p className="z-50 px-10 text-3xl font-bold text-gray-600/40">書き出し時には消えます。</p>
      </div>
    </Sequence>
  );
};
