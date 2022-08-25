import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Logo } from "./Logo";
import { Subtitle } from "./Subtitle";
import type { FC } from "react";
import { FirstPageState } from "src/store/features/firstPageSlice";

/** @package */
export const LogoComp: FC<FirstPageState> = ({ title, imageUrl }) => {
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
      <Logo imageUrl={imageUrl} />
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
        {title}
      </div>
      <Subtitle />
    </AbsoluteFill>
  );
};
