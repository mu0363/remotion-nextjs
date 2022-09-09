import { interpolate } from "remotion";
import { useCurrentFrame } from "remotion";
import type { FC } from "react";

/* @package **/
export const T2S2_Text1: FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const opacityIn = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacityOut = interpolate(frame, [90, 130], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [0, 130], [1, 1.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const blur = interpolate(frame, [90, 130], [0, 10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const letterSpacing = interpolate(frame, [0, 130], [0, 20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div
        className="absolute z-30 mt-[0px] whitespace-pre-wrap text-[80px] leading-normal text-white"
        style={{
          opacity: `${frame < 90 ? opacityIn : opacityOut}`,
          fontFamily: "Cinzel",
          transform: `scale(${scale})`,
          // filter: `blur(${blur}px)`,
          letterSpacing: `${letterSpacing}px`,
          // textShadow: "0 0 5px #FFF,0 0 5px #FFF,0 0 5px #FFF,0 0 5px #FFF",
        }}
      >
        {text}
      </div>
    </div>
  );
};
