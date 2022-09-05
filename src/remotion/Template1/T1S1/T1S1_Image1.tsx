import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { FC } from "react";

/* @package **/
export const T1S1_Image1: FC<{ image: string }> = ({ image }) => {
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

  const entranceOffset = interpolate(entrance, [0, 1], [height, 0]);

  const wave1 = Math.cos(frame / 50) * 10 + entranceOffset;
  const wave2 = Math.cos((frame - 5) / 15) * 10 + entranceOffset;

  return (
    <div className="relative">
      <Img
        src={image}
        alt="avatar"
        className="absolute z-10 mt-40 ml-24 h-[720px] w-[1080px] rounded-3xl object-cover"
        style={{
          transform: `translateY(${wave2}px)`,
          rotate: "-2deg",

          // boxShadow: "2px 4px 18px #212121",
        }}
      />
      <Img
        src={image}
        alt="avatar"
        className="h-[1080px] w-[1920px] object-cover opacity-20"
        style={{
          transform: `translateY(${wave1}px)`,
          filter: "blur(20px)",
          // rotate: "3deg",
        }}
      />
    </div>
  );
};
