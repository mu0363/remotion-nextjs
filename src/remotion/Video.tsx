import "../styles/global.css";
import "../styles/font.css";
import { useAtomValue } from "jotai";
import { Provider } from "react-redux";
import { Composition } from "remotion";
import { selectedTemplateAtom } from "../libs/atom";
import { COMP_NAME } from "../libs/const";
import { Template1DefaultProps, Template2DefaultProps, TEMPLATE1_DURATION } from "../libs/const/remotion-config";
import { store } from "../libs/store";
import { Template1 } from "./Template1";
import { Template2 } from "./Template2";
import type { FC } from "react";

export const RemotionVideo: FC = () => {
  const selectedTemplate = useAtomValue(selectedTemplateAtom);

  return (
    <Provider store={store}>
      <Composition
        id={COMP_NAME}
        component={selectedTemplate === "template01" ? Template1 : Template2}
        durationInFrames={TEMPLATE1_DURATION}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={selectedTemplate === "template01" ? Template1DefaultProps : Template2DefaultProps}
      />
    </Provider>
  );
};
