import { Aside, MediaQuery } from "@mantine/core";
import type { FC } from "react";
import { Form } from "src/components/Form";
import { ASIDE_WIDTH } from "src/libs/const";

/** @package */
export const ASide: FC = () => {
  return (
    <MediaQuery smallerThan="md" styles={{ display: "none" }}>
      <Aside p="md" hiddenBreakpoint="sm" width={{ sm: ASIDE_WIDTH }}>
        <Form />
      </Aside>
    </MediaQuery>
  );
};
