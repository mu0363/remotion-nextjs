import { Player } from "@remotion/player";
import { useSelector } from "react-redux";
import type { NextPage } from "next";
import { LogoComp } from "src/remotion/LogoComp";
import { selectAllText } from "src/store/features/firstPageSlice";

const Home: NextPage = () => {
  const firstPageData = useSelector(selectAllText);
  const { title, imageUrl } = firstPageData;

  return (
    <Player
      component={LogoComp}
      inputProps={{ title, imageUrl }}
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
