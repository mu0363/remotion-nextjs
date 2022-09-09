import "../styles/global.css";
import "../styles/font.css";
import { Provider } from "react-redux";
import { Composition } from "remotion";
import { Template1DefaultProps, Template2DefaultProps, TEMPLATE1_DURATION } from "../libs/const/remotion-config";
import { store } from "../libs/store";
import { Template1 } from "./Template1";
import { Template2 } from "./Template2";
import type { FC } from "react";

export const RemotionVideo: FC = () => {
  return (
    <Provider store={store}>
      <Composition
        id="template01"
        component={Template1}
        durationInFrames={TEMPLATE1_DURATION}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={Template1DefaultProps}
      />
      <Composition
        id="template02"
        component={Template2}
        durationInFrames={TEMPLATE1_DURATION}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={Template2DefaultProps}
      />
    </Provider>
  );
};
