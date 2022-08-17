import { interpolate, useCurrentFrame } from "remotion";
import type { FC } from "react";

export const Subtitle: FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity, fontSize: "2rem", color: "#374151" }}>
      Edit <code style={{ fontWeight: "bold", fontFamily: "sans-serif" }}>src/index.tsx</code> and save to reload.
    </div>
  );
};
