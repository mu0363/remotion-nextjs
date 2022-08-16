import { Player } from "@remotion/player";
import { LogoComp } from "../remotion/LogoComp";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Player
      component={LogoComp}
      inputProps={{ text: "World" }}
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
