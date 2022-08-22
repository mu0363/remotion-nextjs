import "../styles/global.css";
import { Composition } from "remotion";
import { COMP_NAME } from "../libs/const";
import { LogoComp } from "./LogoComp";

export const RemotionVideo: React.FC = () => {
  return (
    <Composition
      id={COMP_NAME}
      component={LogoComp}
      durationInFrames={240}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        title: "This is default text",
        imageUrl: "https://source.unsplash.com/random/200x200",
      }}
    />
  );
};
