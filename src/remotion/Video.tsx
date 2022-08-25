import "../styles/global.css";
import { Provider } from "react-redux";
import { Composition } from "remotion";
import { COMP_NAME } from "../libs/const";
import { TEMPLATE1_DURATION } from "../libs/const/remotion-config";
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
        defaultProps={[
          { page: 1, id: 1, text: "First Text", image: "https://source.unsplash.com/random/200x200" },
          {
            page: 1,
            id: 2,
            text: "Second Text",
            image: "https://source.unsplash.com/random/200x200",
          },
          {
            page: 1,
            id: 3,
            text: "Third Text",
            image: "https://source.unsplash.com/random/200x200",
          },
        ]}
      />
    </Provider>
  );
};
