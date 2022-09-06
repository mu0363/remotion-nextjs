import { interpolate } from "remotion";
import { useCurrentFrame } from "remotion";
import type { FC } from "react";

/* @package **/
export const T1S1_Text1: FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      className="absolute z-30 mt-[0px] ml-[1050px] whitespace-pre-wrap text-6xl font-bold leading-normal text-gray-700"
      style={{
        opacity,
        fontFamily: "Kiwi Maru",
      }}
    >
      {text}
    </div>
  );
};
