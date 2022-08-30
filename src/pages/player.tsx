// FIXME:
/* eslint-disable no-console */
import { Box, Center, createStyles, MediaQuery, Stack } from "@mantine/core";
import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import type { CustomNextPage } from "next";
import { Form } from "src/components/Form";
import { TimelineCard } from "src/components/TimelineCard";
import { EditLayout } from "src/layout/EditLayout";
import { TEMPLATE1_DURATION } from "src/libs/const/remotion-config";
import { useImageQuery } from "src/libs/hooks/useImageQuery";
import { Template1 } from "src/remotion/Template1";
import { selectAllCurrentPage } from "src/store/features/currentPageSlice";
import { selectAllTemplate1Data } from "src/store/features/template1Slice";

const useStyles = createStyles((theme) => ({
  playerCenter: {
    marginTop: "100px",
    [theme.fn.smallerThan("md")]: {
      marginTop: "0",
    },
  },
}));

const style = {
  player: {
    "@media (max-width: 992px)": {
      display: "none",
    },
  },
};

const scenes = [
  { id: 1, time: 3 },
  { id: 2, time: 4 },
  { id: 3, time: 3 },
];

const Player: CustomNextPage = () => {
  const { classes } = useStyles();
  const { data: images, isLoading, error } = useImageQuery();
  const template1Data = useSelector(selectAllTemplate1Data);
  const currentPageData = useSelector(selectAllCurrentPage);

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
      <div className="mx-10">
        <Center className={classes.playerCenter}>
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
        </Center>
      </div>
      <Stack mx={20}>
        <Box sx={{ display: "flex", overflowX: "scroll" }}>
          {scenes.map((scene) => (
            <div key={scene.id}>
              <TimelineCard currentId={scene.id} />
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
