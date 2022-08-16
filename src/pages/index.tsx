import { Player } from "@remotion/player";
import type { NextPage } from "next";
import { LogoComp } from "../remotion/LogoComp";

const Home: NextPage = () => {
  return (
    <div>
      <Player
        component={LogoComp}
        inputProps={{ text: "World" }}
        durationInFrames={120}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        style={{
          width: 1280,
          height: 720,
        }}
        controls
        loop
        autoPlay
      />
    </div>
  );
};

export default Home;
