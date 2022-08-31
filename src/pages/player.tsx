// FIXME:
/* eslint-disable no-console */
import { ActionIcon, Box, MediaQuery } from "@mantine/core";
import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import { IconPlayerPlay, IconPlayerPause } from "@tabler/icons";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { CustomNextPage } from "next";
import { Form } from "src/components/Form";
import { TimelineCard } from "src/components/TimelineCard";
import { EditLayout } from "src/layout/EditLayout";
import { TEMPLATE1_DURATION, timelineScenes } from "src/libs/const/remotion-config";
import { Template1 } from "src/remotion/Template1";
import { selectAllActiveScene } from "src/store/features/activeSceneSlice";
import { selectAllTemplate1Data } from "src/store/features/template1Slice";

const Player: CustomNextPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const template1Data = useSelector(selectAllTemplate1Data);
  const activeSceneData = useSelector(selectAllActiveScene);
  const playerRef = useRef<PlayerRef>(null);

  // const calculateTime = (fps: number) => {
  //   const minute = Math.floor(fps / (30 * 60));
  //   const second = Math.floor(fps / 30);
  //   const padSecond = String(second).padStart(2, "0");
  //   return `${minute}:${padSecond}`;
  // };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.seekTo(activeSceneData.from);
    }
  }, [activeSceneData]);

  return (
    <div>
      <div className="sticky top-0 mx-0 pt-0 md:mx-10 md:pt-10">
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
      <div className="mx-0 md:mx-10">
        <div className="flex items-center">
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
            <p className="mx-5 mt-2 text-xs font-bold text-gray-600">02:30</p>
          </div>
          <Box sx={{ display: "flex", overflowX: "scroll" }}>
            {timelineScenes.map((card) => (
              <div key={card.id}>
                <TimelineCard card={card} />
              </div>
            ))}
          </Box>
        </div>
      </div>

      <div className="mx-5 pt-5">
        <Form />
      </div>
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Box m={20}>{/* <Form /> */}</Box>
      </MediaQuery>
    </div>
  );
};

Player.getLayout = EditLayout;

export default Player;
