import { useSelector } from "react-redux";
import { selectAllTemplate1Data } from "../store/features/template1Slice";

export const useCurrentData = (scene_number: number) => {
  const template1Data = useSelector(selectAllTemplate1Data);
  const sceneContent = template1Data.filter((data) => data.id === scene_number);
  return sceneContent[0];
};
