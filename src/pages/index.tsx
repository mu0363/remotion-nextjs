import { Player } from "@remotion/player";
import { useSelector } from "react-redux";
import { selectAllTemplate1Data } from "src/libs/store/features/template1Slice";
import { Template1 } from "src/remotion/Template1";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const template1Data = useSelector(selectAllTemplate1Data);

  return (
    <Player
      component={Template1}
      inputProps={template1Data}
      durationInFrames={120}
      compositionWidth={1920}
      compositionHeight={1080}
      fps={30}
      style={{ width: "100%" }}
      controls
      loop
    />
  );
};

export default Home;
