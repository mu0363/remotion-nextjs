import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { FC } from "react";

/* @package **/
export const T1S3_Image1: FC<{ image: string }> = ({ image }) => {
  const frame = useCurrentFrame();
  const { height, fps } = useVideoConfig();

  const entrance = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: 30,
  });
  const opacity = interpolate(frame, [0, 30], [0, 0.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const transformOffset = interpolate(entrance, [0, 1], [height, 0]);
  const wave = Math.cos((frame - 5) / 15) * 10 + transformOffset;

  return (
    <div className="relative">
      <Img
        src={image}
        alt="avatar"
        className="absolute z-10 mt-[950px] ml-24 h-[720px] w-[1080px] rounded-3xl object-cover"
        style={{
          transform: `translateY(${wave}px)`,
          rotate: "-2deg",
          boxShadow: "8px 8px 24px #BFBFBF",
        }}
      />
      <Img
        src={image}
        alt="avatar"
        className="h-[2580px] w-[3520px] object-cover"
        style={{
          opacity: opacity,
          // filter: "blur(10px)",
          // rotate: "3deg",
        }}
      />
    </div>
  );
};
