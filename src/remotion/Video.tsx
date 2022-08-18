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
        firstText: "This is default text",
      }}
    />
  );
};
