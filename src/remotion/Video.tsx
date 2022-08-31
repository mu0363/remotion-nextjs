import "../styles/global.css";
import { Provider } from "react-redux";
import { Composition } from "remotion";
import { COMP_NAME } from "../libs/const";
import { defaultProps, TEMPLATE1_DURATION } from "../libs/const/remotion-config";
import { store } from "../store";
import { Template1 } from "./Template1";
import type { FC } from "react";

export const RemotionVideo: FC = () => {
  return (
    <Provider store={store}>
      <Composition
        id={COMP_NAME}
        component={Template1}
        durationInFrames={TEMPLATE1_DURATION}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultProps}
      />
    </Provider>
  );
};
