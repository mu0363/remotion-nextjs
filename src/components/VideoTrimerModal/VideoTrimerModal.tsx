// import dynamic from "next/dynamic";
// const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { FC, useCallback, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { VideoTrimer } from "../VideoTrimer";

/** @package */
export const VideoTrimerModal: FC = () => {
  const playerRef = useRef<ReactPlayer>(null);
  const [isReady, setIsReady] = useState(false);

  const onReady = useCallback(() => {
    if (!isReady) {
      const timeToStart = 10;
      playerRef.current?.seekTo(timeToStart, "seconds");
      setIsReady(true);
    }
  }, [isReady]);

  return (
    <div>
      <ReactPlayer
        url="https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/videos/AWARDS_OPENER.mp4"
        ref={playerRef}
        controls={true}
        muted={true}
        onReady={onReady}
      />
      <VideoTrimer />
    </div>
  );
};
