import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useCallback, useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import type { ChangeEvent, FC } from "react";

const Container = styled.div`
  height: 10vh;
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
  width: 95%;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    pointer-events: all;
    position: relative;
    cursor: ew-resize;

    border: none;
    height: 56px;
    width: 20px;
    background: #17a2b8;
  }
`;

const RangeLeft = styled.input`
  z-index: 3;

  ${ThumbBase}
  &::-webkit-slider-thumb {
    border-top-left-radius: 10%;
    border-bottom-left-radius: 10%;
  }
`;

const RangeRight = styled.input`
  z-index: 4;

  ${ThumbBase}
  &::-webkit-slider-thumb {
    border-top-right-radius: 10%;
    border-bottom-right-radius: 10%;
  }
`;

const Slider = styled.div`
  position: relative;
  width: 100%;
`;

const SliderBox = styled.div<{ minPercent: number; maxPercent: number }>`
  pointer-events: all;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
  position: absolute;
  height: 56px;
  margin-top: -28px;

  left: ${(props) => `${props.minPercent}%`};
  width: ${(props) => `${props.maxPercent - props.minPercent}%`};
  background: #eeeeee;
  z-index: 2;
`;

/** @package */
export const VideoTrimer: FC = () => {
  const min = 0;
  const max = 1000;
  const gap = 1;
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState<number>(max);
  const [minPercent, setMinPercent] = useState(0);
  const [maxPercent, setMaxPercent] = useState(100);

  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

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

  // React Player
  const playerRef = useRef<ReactPlayer>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>();

  const onReady = useCallback(() => {
    if (!isReady) {
      playerRef.current?.seekTo(minVal, "seconds");
      setDuration(playerRef.current?.getDuration());
      const currentDuration = playerRef.current?.getDuration();
      if (currentDuration) {
        setMaxVal(currentDuration);
      }
      setIsReady(true);
    }
  }, [isReady, minVal]);

  useEffect(() => {
    playerRef.current?.seekTo(minVal, "seconds");
  }, [minVal, playerRef]);

  useEffect(() => {
    playerRef.current?.seekTo(maxVal, "seconds");
  }, [maxVal, playerRef]);

  return (
    <div>
      {duration && <p>{`duration: ${duration}`}</p>}
      <p>{`minVal: ${minVal}`}</p>
      <p>{`maxVal: ${maxVal}`}</p>
      <p>{`min%: ${minPercent}`}</p>
      <p>{`max%: ${`${maxPercent}`}`}</p>
      <button onClick={() => setIsPlaying(false)}>STOP</button>
      <ReactPlayer
        url="https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/videos/AWARDS_OPENER.mp4"
        width="100%"
        height="100%"
        playing={isPlaying}
        ref={playerRef}
        controls={true}
        muted={true}
        onReady={onReady}
        onPlay={() => setIsPlaying(true)}
      />
      <Container>
        <RangeLeft
          type="range"
          min={min}
          max={duration}
          value={minVal}
          ref={minValRef}
          step="0.01"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(+event.target.value, maxVal - gap);
            setMinVal(value);
            event.target.value = value.toString();
          }}
        />
        <RangeRight
          type="range"
          min={min}
          max={duration}
          value={maxVal}
          ref={maxValRef}
          step="0.01"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(+event.target.value, minVal + gap);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
        />

        <Slider>
          <SliderBox minPercent={minPercent} maxPercent={maxPercent} />
        </Slider>
      </Container>
    </div>
  );
};
