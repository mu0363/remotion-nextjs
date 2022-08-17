import { AbsoluteFill } from "remotion";
import { interpolate } from "remotion";
import { useCurrentFrame } from "remotion";
import { Logo } from "./Logo";
import { Subtitle } from "./Subtitle";
import type { FC } from "react";

export const LogoComp: FC<{ firstText: string }> = ({ firstText }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Logo />
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
        {firstText}
      </div>
      <Subtitle />
    </AbsoluteFill>
  );
};
