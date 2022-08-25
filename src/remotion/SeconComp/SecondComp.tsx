import { Text } from "@mantine/core";
import { AbsoluteFill } from "remotion";
import type { FC } from "react";

/** @package */
export const SecondComp: FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>SecondComp</Text>
    </AbsoluteFill>
  );
};
