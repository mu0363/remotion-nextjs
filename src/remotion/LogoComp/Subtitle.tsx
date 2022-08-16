import type { FC } from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const Subtitle: FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div className="text-gray-600 text-xl" style={{ opacity }}>
      Edit <code className="text-red-700 font-bold">src/index.tsx</code> and
      save to reload.
    </div>
  );
};
