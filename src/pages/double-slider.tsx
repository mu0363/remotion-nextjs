import styled from "@emotion/styled";
import { FC, useState } from "react";
import type { NextPage } from "next";

const Slider = styled.div`
  height: 5px;
  border-radius: 5px;
  background: #ddd;
  position: relative;
`;

const Progress = styled.div<{ minPercent: number; maxPercent: number }>`
  height: 5px;
  left: ${(props) => `${props.minPercent}%`};
  right: ${(props) => `${props.maxPercent}%`};
  border-radius: 5px;
  background: #17a2b8;
  position: absolute;
`;

const RangeInput = styled.div`
  position: relative;
  pointer-events: none;
`;

const RangeMin = styled.input`
  position: absolute;
  top: -5px;
  height: 5px;
  width: 100%;
  background: none;
  -webkit-appearance: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 34px;
    width: 17px;
    background: #17a2b8;
    pointer-events: all;
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
    /* border-top-left-radius: 30%;
    border-bottom-left-radius: 30%; */
  }
`;

// const RangeMax = styled.input`
//   position: absolute;
//   top: -5px;
//   height: 5px;
//   width: 100%;
//   background: none;
//   -webkit-appearance: none;
//   &::-webkit-slider-thumb {
//     -webkit-appearance: none;
//     height: 34px;
//     width: 17px;
//     background: #17a2b8;
//     /* pointer-events: auto; */
//     border-top-right-radius: 30%;
//     border-bottom-right-radius: 30%;
//     cursor: grab;
//   }
// `;

const DoubleSlider: NextPage = () => {
  const maxValue = 10000;
  const gap = 1000;
  const [min, setMin] = useState(2500);
  const [max, setMax] = useState(7500);
  const [minPercent, setMinPercent] = useState(25);
  const [maxPercent, setMaxPercent] = useState(75);

  return (
    <div className="mx-auto mt-12 max-w-2xl">
      <h2 className="mx-auto mb-6 text-2xl font-bold text-gray-700">Range Slider</h2>
      <div className="mb-12 flex items-center space-x-4">
        <Field text="Min" value={min} />
        <Field text="Max" value={max} />
      </div>
      <Slider>
        <Progress minPercent={minPercent} maxPercent={maxPercent} />
      </Slider>
      <RangeInput>
        <RangeMin
          type="range"
          min={0}
          max={maxValue}
          value={min}
          onChange={(e) => {
            setMin(parseInt(e.target.value));
            if (max - min < gap) {
              setMin(max - gap);
            } else {
              setMinPercent((min / maxValue) * 100);
            }
          }}
        />
        <RangeMin
          type="range"
          min={0}
          max={maxValue}
          value={max}
          onChange={(e) => {
            setMax(parseInt(e.target.value));
            if (max - min < gap) {
            } else {
              setMaxPercent(100 - (max / maxValue) * 100);
            }
          }}
        />
      </RangeInput>
      <p>{minPercent}</p>
      <p>{maxPercent}</p>
    </div>
  );
};

export default DoubleSlider;

const Field: FC<{ text: string; value: number }> = ({ text, value }) => {
  return (
    <div className="flex items-center space-x-3">
      <span className="font-bold text-gray-700">{text}</span>
      <input
        type="text"
        className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        defaultValue={value}
      />
    </div>
  );
};
