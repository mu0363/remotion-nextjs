import { useAtomValue } from "jotai";
import { useSelector } from "react-redux";
import { selectedTemplateAtom } from "../atom";
import { selectAllTemplate1Data } from "../store/features/template1Slice";
import { selectAllTemplate2Data } from "../store/features/template2Slice";

export const useCurrentData = (scene_number: number) => {
  const selectedTemplate = useAtomValue(selectedTemplateAtom);
  const template1Data = useSelector(selectAllTemplate1Data);
  const template2Data = useSelector(selectAllTemplate2Data);
  const template1SceneContent = template1Data.sceneState.filter((data) => data.id === scene_number);
  const template2SceneContent = template2Data.sceneState.filter((data) => data.id === scene_number);

  switch (selectedTemplate) {
    case "template01":
      return template1SceneContent[0];
    case "template02":
      return template2SceneContent[0];
    default:
      return template1SceneContent[0];
  }
};
