import { Player as RemotionPlayer } from "@remotion/player";
import { useSelector } from "react-redux";
import type { NextPage } from "next";
import { PlayerLayout } from "src/layout/PlayerLayout";
import { LogoComp } from "src/remotion/LogoComp";
import { selectAllText } from "src/store/features/textSlice";

const Player: NextPage = () => {
  const texts = useSelector(selectAllText);

  return (
    <PlayerLayout>
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
    </PlayerLayout>
  );
};

export default Player;
