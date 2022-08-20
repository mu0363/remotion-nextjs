import { Group, Header as MantineHeader } from "@mantine/core";
import { FC } from "react";
import { AvantIcon } from "src/components/SVG";
import { HEADER_HEIGHT } from "src/libs/const";

/** @package */
export const Header: FC = () => {
  return (
    <MantineHeader height={HEADER_HEIGHT}>
      <Group m="lg">
        <AvantIcon />
      </Group>
    </MantineHeader>
  );
};
