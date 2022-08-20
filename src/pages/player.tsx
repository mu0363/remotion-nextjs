import { Box, MediaQuery } from "@mantine/core";
import { Player as RemotionPlayer } from "@remotion/player";
import { useSelector } from "react-redux";
import type { CustomNextPage } from "next";
import { Form } from "src/components/Form";
import { DashboardLayout } from "src/layout/DashboardLayout";
import { LogoComp } from "src/remotion/LogoComp";
import { selectAllText } from "src/store/features/textSlice";

const Player: CustomNextPage = () => {
  const texts = useSelector(selectAllText);

  return (
    <>
      <RemotionPlayer
        component={LogoComp}
        inputProps={{ firstText: texts.firstText }}
        durationInFrames={120}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        style={{ width: "100%" }}
        controls
        loop
        autoPlay
      />
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Box m={20}>
          <Form />
        </Box>
      </MediaQuery>
    </>
  );
};

Player.getLayout = DashboardLayout;

export default Player;
