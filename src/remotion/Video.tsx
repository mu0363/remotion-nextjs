import "../styles/global.css";
import { Composition } from "remotion";
import { COMP_NAME } from "../libs/const";
import { Template1 } from "./Template1";
import type { FC } from "react";

export const RemotionVideo: FC = () => {
  return (
    <Composition
      id={COMP_NAME}
      component={Template1}
      durationInFrames={240}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={[
        { page: 1, id: 1, text: "First Text", image: "https://source.unsplash.com/random/200x200" },
        {
          page: 1,
          id: 2,
          text: "Second Text",
          image: "https://source.unsplash.com/random/200x200",
        },
      ]}
    />
  );
};
