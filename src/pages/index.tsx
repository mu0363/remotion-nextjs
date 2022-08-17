import { Player } from "@remotion/player";
import { useSelector } from "react-redux";
import type { NextPage } from "next";
import { LogoComp } from "src/remotion/LogoComp";
import { selectAllText } from "src/store/features/textSlice";

const Home: NextPage = () => {
  const texts = useSelector(selectAllText);
  return (
    <Player
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
  );
};

export default Home;
