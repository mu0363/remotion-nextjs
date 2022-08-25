import { Avatar } from "@mantine/core";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { FC } from "react";

export const Logo: FC<{ imageUrl: string }> = ({ imageUrl }) => {
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
      <Avatar
        src={imageUrl}
        radius="xl"
        alt="avatar"
        style={{
          transform: `translateY(${wave2}px)`,
          width: 300,
          height: 300,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};
