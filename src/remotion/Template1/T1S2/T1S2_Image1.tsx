import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { FC } from "react";

/* @package **/
export const T1S2_Image1: FC<{ image: string }> = ({ image }) => {
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

  // const wave1 = Math.cos(frame / 15) * 10 + entranceOffset;
  const wave2 = Math.cos((frame - 5) / 15) * 10 + entranceOffset;

  return (
    <div>
      <Img
        src={image}
        alt="avatar"
        className="h-80 w-80 rounded-full object-cover"
        style={{
          transform: `translateY(${wave2}px)`,
        }}
      />
    </div>
  );
};
