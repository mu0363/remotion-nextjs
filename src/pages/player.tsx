// FIXME:
/* eslint-disable no-console */
import { Box, Center, MediaQuery, Stack, Text } from "@mantine/core";
import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import type { CustomNextPage } from "next";
import { Form } from "src/components/Form";
import { TimelineCard } from "src/components/TimelineCard";
import { DashboardLayout } from "src/layout/DashboardLayout";
import { TEMPLATE1_DURATION } from "src/libs/const/remotion-config";
import { Template1 } from "src/remotion/Template1";
import { selectCurrentFrame } from "src/store/features/currentFrameSlice";
import { selectAllCurrentPage } from "src/store/features/currentPageSlice";
import { selectAllTemplate1Data } from "src/store/features/template1Slice";

const scenes = [
  { id: 1, time: 3 },
  { id: 2, time: 4 },
  { id: 3, time: 3 },
];

const Player: CustomNextPage = () => {
  const template1Data = useSelector(selectAllTemplate1Data);
  const currentPageData = useSelector(selectAllCurrentPage);
  const currentFrameData = useSelector(selectCurrentFrame);
  const playerRef = useRef<PlayerRef>(null);

  const calculateTime = (fps: number) => {
    const minute = Math.floor(fps / (30 * 60));
    const second = Math.floor(fps / 30);
    const padSecond = String(second).padStart(2, "0");
    return `${minute}:${padSecond}`;
  };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.seekTo(currentPageData.from);
    }
  }, [currentPageData]);

  return (
    <Box>
      <Center mt={100} mb={40}>
        <RemotionPlayer
          ref={playerRef}
          component={Template1}
          inputProps={template1Data}
          durationInFrames={TEMPLATE1_DURATION}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={30}
          style={{ width: "80%" }}
          controls
          autoPlay
          loop
        />
      </Center>
      <Stack mx={20} pb={16}>
        <Box sx={{ display: "flex", overflowX: "scroll" }}>
          {scenes.map((scene) => (
            <div key={scene.id}>
              <TimelineCard currentId={scene.id} />
            </div>
          ))}
        </Box>
        <Text sx={{ fontWeight: "bold" }}>{`${calculateTime(currentFrameData.currentFrame)} / ${calculateTime(
          TEMPLATE1_DURATION
        )}`}</Text>
      </Stack>
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Box m={20}>
          <Form />
        </Box>
      </MediaQuery>
    </Box>
  );
};

Player.getLayout = DashboardLayout;

export default Player;
