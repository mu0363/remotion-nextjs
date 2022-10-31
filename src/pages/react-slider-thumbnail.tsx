import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { generateVideoThumbnails } from "@rajesh896/video-thumbnails-generator";
import Image from "next/image";
import { useCallback, useEffect, useState, useRef } from "react";
import type { ChangeEvent, FC } from "react";

const Container = styled.div`
  height: 25vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ThumbBase = css`
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  pointer-events: none;
  position: absolute;
  height: 0;
  width: 100%;
  outline: none;
  margin-top: 42px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
    cursor: ew-resize;

    border: none;
    height: 56px;
    width: 16px;
    background: #17a2b8;
  }
`;

const ThumbLeft = styled.input`
  z-index: 3;

  ${ThumbBase}
  &::-webkit-slider-thumb {
    border-top-left-radius: 10%;
    border-bottom-left-radius: 10%;
  }
`;

const ThumbRight = styled.input`
  z-index: 4;

  ${ThumbBase}
  &::-webkit-slider-thumb {
    border-top-right-radius: 10%;
    border-bottom-right-radius: 10%;
  }
`;

// const ThumbCenter = styled.input<{ minPercent: number; maxPercent: number; widthPercent: number }>`
//   -webkit-appearance: none;
//   -webkit-tap-highlight-color: transparent;
//   pointer-events: none;
//   position: absolute;
//   height: 0;
//   width: 100%;
//   outline: none;
//   z-index: 5;

//   &::-webkit-slider-thumb {
//     -webkit-appearance: none;
//     -webkit-tap-highlight-color: transparent;
//     /* pointer-events: all; */
//     position: relative;
//     margin-top: 4px;
//     cursor: grab;
//     &:active {
//       cursor: grabbing;
//     }
//     border: solid 4px #17a2b8;
//     height: 46px;
//     width: ${(props) => `${props.maxPercent - props.minPercent}%`};
//     transform: translateX(0%);
//   }
// `;

const Slider = styled.div`
  position: relative;
  width: 100%;
`;

const SliderBox = styled.div<{ minPercent: number; maxPercent: number }>`
  /* pointer-events: all;
  cursor: grab;
  &:active {
    cursor: grabbing;
  } */
  position: absolute;
  height: 56px;
  margin-top: -5px;

  left: ${(props) => `${props.minPercent}%`};
  width: ${(props) => `${props.maxPercent - props.minPercent}%`};
  border: solid 5px #17a2b8;
  z-index: 2;
`;

const Thumbnails = styled.div`
  position: absolute;
  display: flex;
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
  const [videoThumbnails, setVideoThumbnails] = useState<string[]>([]);
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

  const getVideoThumbnails = async (e: ChangeEvent<HTMLInputElement>, numberOfThumbnails: number) => {
    const files = e.currentTarget.files;
    if (!files || files?.length === 0) return;
    const videoFile = files[0];
    if (!videoFile.type.includes("video")) return;
    const thumbnails = await generateVideoThumbnails(videoFile, numberOfThumbnails, "video");
    setVideoThumbnails(thumbnails);
  };

  return (
    <div>
      <Container>
        <ThumbLeft
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
        <ThumbRight
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
        {/* FIXME: 全体を掴んで動かせるようにする*/}
        {/* https://dev.to/sandra_lewis/building-a-multi-range-slider-in-react-from-scratch-4dl1 */}
        {/* <ThumbCenter
          minPercent={minPercent}
          maxPercent={maxPercent}
          widthPercent={widthPercent}
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
        /> */}

        <Slider>
          <SliderBox minPercent={minPercent} maxPercent={maxPercent} />
          <Thumbnails>
            {videoThumbnails.map((videoThumbnail, index) => (
              <div key={index}>
                <Image src={videoThumbnail} alt="thumbnail" width={82} height={46} />
              </div>
            ))}
          </Thumbnails>
        </Slider>
      </Container>
      <input type="file" onChange={(e) => getVideoThumbnails(e, 5)} />
    </div>
  );
};

export default MultiRangeSlider;
