import { interpolate, spring, useCurrentFrame, useVideoConfig, Video } from "remotion";
import type { FC } from "react";

/* @package **/
export const T1S2_Video: FC<{ image: string }> = ({ image }) => {
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
      <Video
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        className="z-10 ml-[620px] h-[720px] w-[1080px] rounded-3xl object-cover"
        style={{
          transform: `translateY(${wave}px)`,
          rotate: "2deg",
          boxShadow: "8px 8px 24px #BFBFBF",
        }}
        startFrom={2360}
      />
    </div>
  );
};
// <Video
//   src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
//   style={{
//     transform: `translateY(${wave}px)`,
//     rotate: "2deg",
//     boxShadow: "8px 8px 24px #BFBFBF",
//     zIndex: "10",
//   }}
//   startFrom={360}
// />;
