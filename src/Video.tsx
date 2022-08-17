import "./styles/global.css";
import { Composition } from "remotion";
import { LogoComp } from "./LogoComp";

export const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition id="MyComp" component={LogoComp} durationInFrames={240} fps={30} width={1920} height={1080} />
    </>
  );
};
