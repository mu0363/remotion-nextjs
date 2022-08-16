import { interpolate, useCurrentFrame } from "remotion";
import type { FC } from "react";

export const Subtitle: FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div className="text-xl text-gray-600" style={{ opacity }}>
      Edit <code className="font-bold text-red-700">src/index.tsx</code> and save to reload.
    </div>
  );
};
