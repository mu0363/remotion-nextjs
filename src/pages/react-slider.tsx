import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ChangeEvent, FC, useCallback, useEffect, useState, useRef } from "react";

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ThumbBase = css`
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
`;

const Thumb1 = styled.input`
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  position: absolute;
  height: 0;
  width: 100%;
  outline: none;
  z-index: 3;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
    cursor: grab;
    &:active {
      cursor: grabbing;
    }

    border: none;
    height: 46px;
    width: 16px;
    background: #17a2b8;
    border-top-left-radius: 10%;
    border-bottom-left-radius: 10%;
  }
`;

const Thumb2 = styled.input`
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  pointer-events: none;
  position: absolute;
  height: 0;
  width: 100%;
  outline: none;
  z-index: 4;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
    cursor: grab;
    &:active {
      cursor: grabbing;
    }

    border: none;
    height: 46px;
    width: 16px;
    background: #17a2b8;
    border-top-right-radius: 10%;
    border-bottom-right-radius: 10%;
  }
`;

const Slider = styled.div`
  position: relative;
  width: 100%;
`;

const SliderTrack = styled.div`
  position: absolute;
  border-radius: 3px;
  height: 5px;
  background-color: #ced4da;
  width: 100%;
  z-index: 1;
`;

const SliderRange = styled.div`
  position: absolute;
  height: 5px;
  background-color: #9fe5e1;
  z-index: 2;
`;

const SliderBox = styled.div<{ minPercent: number; maxPercent: number }>`
  position: absolute;
  height: 46px;
  margin-top: -21px;
  left: ${(props) => `${props.minPercent}%`};
  width: ${(props) => `${props.maxPercent - props.minPercent}%`};
  border: solid 4px #17a2b8;
  z-index: 2;
  border-radius: 5%;
`;

type MultiRangeSliderProps = {
  min: number;
  max: number;
};

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({ min = 0, max = 1000 }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const [minPercent, setMinPercent] = useState(0);
  const [maxPercent, setMaxPercent] = useState(100);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);
  const gap = 100;

  // Convert to percentage
  const getPercent = useCallback((value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      setMinPercent(getPercent(minVal));
      setMaxPercent(getPercent(+maxValRef.current.value)); // Precede with '+' to convert the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent, minPercent, maxPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      setMinPercent(getPercent(+minValRef.current.value));
      setMaxPercent(getPercent(maxVal));

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent, minPercent, maxPercent]);

  return (
    <div>
      <Container>
        <Thumb1
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(+event.target.value, maxVal - gap);
            setMinVal(value);
            event.target.value = value.toString();
          }}
        />
        <Thumb2
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(+event.target.value, minVal + gap);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
        />

        <Slider>
          <SliderBox minPercent={minPercent} maxPercent={maxPercent} />
          <SliderRange />
          <SliderTrack />
        </Slider>
      </Container>
      <p>{`min: ${minPercent}`}</p>
      <p>{`max: ${maxPercent}`}</p>
    </div>
  );
};

export default MultiRangeSlider;
