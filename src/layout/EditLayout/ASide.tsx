import { Aside, MediaQuery } from "@mantine/core";
import { Form } from "src/components/Form";
import { ASIDE_WIDTH } from "src/libs/const";
import type { FC } from "react";

/** @package */
export const ASide: FC = () => {
  return (
    <MediaQuery smallerThan="md" styles={{ display: "none", zIndex: 0 }}>
      <Aside p="md" hiddenBreakpoint="sm" width={{ sm: ASIDE_WIDTH }}>
        <Form />
      </Aside>
    </MediaQuery>
  );
};
