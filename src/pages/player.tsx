import { Box, Center, MediaQuery, Stack, Text } from "@mantine/core";
import { Player as RemotionPlayer } from "@remotion/player";
import { useSelector } from "react-redux";
import type { CustomNextPage } from "next";
import { Form } from "src/components/Form";
import { TimelineCard } from "src/components/TimelineCard";
import { DashboardLayout } from "src/layout/DashboardLayout";
import { LogoComp } from "src/remotion/LogoComp";
import { selectAllFirstPageData } from "src/store/features/firstPageSlice";

const scenes = [
  { id: 1, time: 3 },
  { id: 2, time: 4 },
  { id: 3, time: 3 },
  { id: 4, time: 2 },
  { id: 5, time: 2 },
  { id: 6, time: 4 },
  { id: 7, time: 4 },
  { id: 8, time: 4 },
];

const Player: CustomNextPage = () => {
  const firstPageData = useSelector(selectAllFirstPageData);
  const { title, imageUrl } = firstPageData;

  return (
    <Box>
      <Center mt={100} mb={40}>
        <RemotionPlayer
          component={LogoComp}
          inputProps={{ title, imageUrl }}
          durationInFrames={120}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={30}
          style={{ width: "80%" }}
          controls
          loop
          autoPlay
        />
      </Center>
      <Stack mx={20} pb={16}>
        <Box sx={{ display: "flex", overflowX: "scroll" }}>
          {scenes.map((scene) => (
            <div key={scene.id}>
              <TimelineCard id={scene.id} />
            </div>
          ))}
        </Box>
        <Text sx={{ fontWeight: "bold" }}>0:32 / 6:32</Text>
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
