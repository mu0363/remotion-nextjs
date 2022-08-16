import { interpolate } from "remotion";
import { useCurrentFrame } from "remotion";
import type { FC } from "react";

export const Title: FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ opacity }} className="text-5xl font-bold leading-relaxed text-gray-700">
      Welcome to Remotion with Tailwind right now!
    </div>
  );
};
