import { FC } from "react";
import { AbsoluteFill } from "remotion";
import { Logo } from "./Logo";
import { Subtitle } from "./Subtitle";
import { Title } from "./Title";

export const LogoComp: FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Logo />
      <Title />
      <Subtitle />
    </AbsoluteFill>
  );
};
