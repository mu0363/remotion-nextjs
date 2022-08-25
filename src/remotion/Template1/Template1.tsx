import { T1S1 } from "./T1S1";
import { T1S2 } from "./T1S2";
import type { FC } from "react";
import { Template1State } from "src/store/features/template1Slice";

/** @package */
export const Template1: FC<Template1State> = (props) => {
  return (
    <>
      <T1S1 props={props[0]} />
      <T1S2 props={props[1]} />
    </>
  );
};
