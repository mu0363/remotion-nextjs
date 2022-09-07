import { interpolate } from "remotion";
import { useCurrentFrame } from "remotion";
import type { FC } from "react";

/* @package **/
export const T1S3_Text1: FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      className="mt-16 whitespace-pre-wrap font-sans text-5xl font-bold leading-normal text-gray-700"
      style={{
        opacity,
        fontFamily: "Rampart One",
      }}
    >
      {text}
    </div>
  );
};
