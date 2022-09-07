import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { FC } from "react";

/* @package **/
export const T1S1_Image1: FC<{ image: string }> = ({ image }) => {
  const frame = useCurrentFrame();
  const { height, fps } = useVideoConfig();

  const entranceTransform = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: 30,
  });
  const entranceOpacity = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: 90,
  });

  const transformOffset = interpolate(entranceTransform, [0, 1], [height, 0]);
  const opacityOffset = interpolate(entranceOpacity, [0, 1], [0, 0.1]);
  const wave = Math.cos((frame - 5) / 15) * 10 + transformOffset;

  return (
    <div className="relative">
      <Img
        src={image}
        alt="avatar"
        className="absolute z-10 mt-[900px] ml-24 h-[720px] w-[1080px] rounded-3xl object-cover"
        style={{
          transform: `translateY(${wave}px)`,
          rotate: "-2deg",
          // boxShadow: "2px 4px 18px #212121",
        }}
      />
      <Img
        src={image}
        alt="avatar"
        className="h-[2580px] w-[3520px] object-cover"
        style={{
          opacity: opacityOffset,
          // filter: "blur(20px)",
          // rotate: "3deg",
        }}
      />
    </div>
  );
};
