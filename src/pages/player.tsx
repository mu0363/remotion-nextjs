// FIXME:
/* eslint-disable no-console */
import { ActionIcon, Box } from "@mantine/core";
import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import { IconPlayerPlay, IconPlayerPause } from "@tabler/icons";
import { useAtom, useAtomValue } from "jotai";
import { FC, RefObject, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import type { CustomNextPage } from "next";
import { Form } from "src/components/Form";
import { TimelineCard } from "src/components/TimelineCard";
import { EditLayout } from "src/layout/EditLayout";
import { currentFrameAtom } from "src/libs/atom";
import { isPlayingAtom } from "src/libs/atom/atom";
import { TEMPLATE1_DURATION, timelineScenes } from "src/libs/const/remotion-config";
import { ActiveSceneSlice, selectAllActiveScene } from "src/libs/store/features/activeSceneSlice";
import { selectAllTemplate1Data } from "src/libs/store/features/template1Slice";
import { Template1 } from "src/remotion/Template1";

const Player: CustomNextPage = () => {
  const template1Data = useSelector(selectAllTemplate1Data);
  const activeSceneData = useSelector(selectAllActiveScene);
  const playerRef = useRef<PlayerRef>(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.seekTo(activeSceneData.from);
    }
  }, [activeSceneData]);

  return (
    <div>
      <div className="mx-0 pt-0 md:mx-10 md:pt-10">
        <RemotionPlayer
          ref={playerRef}
          component={Template1}
          inputProps={template1Data}
          durationInFrames={TEMPLATE1_DURATION}
          compositionWidth={1920}
          compositionHeight={1080}
          style={{ width: "100%" }}
          fps={30}
          controls={false}
          autoPlay
          loop
        />
      </div>
      <div className="mx-0 md:mx-5">
        <div className="flex items-center">
          <PlayButton playerRef={playerRef} activeSceneData={activeSceneData} />
          <Box sx={{ display: "flex", overflowX: "scroll" }}>
            {timelineScenes.map((card) => (
              <div key={card.id}>
                <TimelineCard card={card} />
              </div>
            ))}
          </Box>
        </div>
      </div>

      <div className="mx-5 pt-5 md:hidden">
        <Form />
      </div>
    </div>
  );
};

Player.getLayout = EditLayout;

export default Player;

type PlayButtonProps = {
  playerRef: RefObject<PlayerRef>;
  activeSceneData: ActiveSceneSlice;
};

const PlayButton: FC<PlayButtonProps> = ({ playerRef, activeSceneData }) => {
  const currentFrame = useAtomValue(currentFrameAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.seekTo(activeSceneData.from);
    }
  }, [activeSceneData, playerRef]);

  const calculateTime = (fps: number) => {
    const minute = Math.floor(fps / (30 * 60));
    const second = Math.floor(fps / 30);
    const padSecond = String(second).padStart(2, "0");
    return `${minute}:${padSecond}`;
  };

  return (
    <div className="flex flex-col items-center">
      <ActionIcon
        color="red"
        size="lg"
        radius="xl"
        variant="filled"
        className="mx-5 shadow-md"
        onClick={() => {
          playerRef.current?.toggle();
          setIsPlaying(!isPlaying);
        }}
      >
        {isPlaying ? <IconPlayerPause size={18} /> : <IconPlayerPlay size={18} />}
      </ActionIcon>
      <p className="mx-5 mt-2 text-xs font-bold text-gray-600">{calculateTime(currentFrame)}</p>
    </div>
  );
};
