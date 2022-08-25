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
      style={{
        opacity,
        fontSize: "3rem",
        fontWeight: "bold",
        color: "#374151",
        marginTop: 36,
        fontFamily: "Helvetica",
      }}
    >
      {text}
    </div>
  );
};
