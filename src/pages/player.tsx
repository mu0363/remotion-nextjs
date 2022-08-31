// FIXME:
/* eslint-disable no-console */
import { Box, MediaQuery, Stack } from "@mantine/core";
import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import { useEffect, useRef } from "react";
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
    <Box>
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
          controls
          autoPlay
          loop
        />
      </div>
      <Stack mx={20}>
        <Box sx={{ display: "flex", overflowX: "scroll" }}>
          {timelineScenes.map((card) => (
            <div key={card.id}>
              <TimelineCard card={card} />
            </div>
          ))}
        </Box>
      </Stack>
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Box m={20}>
          <Form />
        </Box>
      </MediaQuery>
    </Box>
  );
};

Player.getLayout = EditLayout;

export default Player;
