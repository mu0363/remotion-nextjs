import { AbsoluteFill } from "remotion";
import { Logo } from "./Logo";
import { Subtitle } from "./Subtitle";
import { Title } from "./Title";

export const LogoComp = () => {
  return (
    <AbsoluteFill className="items-center justify-center bg-gray-100">
      <div className="m-10" />
      <Logo />
      <div className="m-3" />
      <Title />
      <Subtitle />
    </AbsoluteFill>
  );
};
