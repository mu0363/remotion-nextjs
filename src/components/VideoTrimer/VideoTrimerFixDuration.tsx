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
  right: ${(props) => `${100 - props.maxPercent}%`};
  background: #eeeeee;
  z-index: 2;
`;

/** @package */
export const VideoTrimerFixDuration: FC = () => {
  const gap = 1; // second
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(1000);
  const [minPercent, setMinPercent] = useState(0);
  const [maxPercent, setMaxPercent] = useState(100);
  const [duration, setDuration] = useState(0);

  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);

  const playerRef = useRef<ReactPlayer>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Convert to percentage
  const getPercent = useCallback((value: number) => Math.round((value / duration) * 100), [duration]);

  // Set width of the range to decrease from the left side
  useEffect(() => {
    setMinPercent(getPercent(minVal));
    playerRef.current?.seekTo(minVal, "seconds");
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    setMaxPercent(getPercent(maxVal));
    playerRef.current?.seekTo(maxVal, "seconds");
  }, [maxVal, getPercent]);

  // React Player
  const onReady = useCallback(() => {
    if (!isReady) {
      playerRef.current?.seekTo(minVal, "seconds");
      const currentDuration = playerRef.current?.getDuration();
      if (currentDuration) {
        setDuration(currentDuration);
        setMaxVal(currentDuration);
      }
      setIsReady(true);
    }
  }, [isReady, minVal]);

  return (
    <div>
      <p>{`duration: ${duration}`}</p>
      <p>{`minVal: ${minVal}`}</p>
      <p>{`maxVal: ${maxVal}`}</p>
      <p>{`min%: ${minPercent}`}</p>
      <p>{`max%: ${`${maxPercent}`}`}</p>
      <button onClick={() => setIsPlaying(!isPlaying)}>STOP</button>
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
          min={0}
          max={duration}
          value={minVal}
          ref={minValRef}
          step="0.01"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(+event.target.value, maxVal - gap);
            setMinVal(value);
          }}
        />
        <RangeRight
          type="range"
          min={0}
          max={duration}
          value={maxVal}
          ref={maxValRef}
          step="0.01"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(+event.target.value, minVal + gap);
            setMaxVal(value);
          }}
        />

        <Slider>
          <SliderBox minPercent={minPercent} maxPercent={maxPercent} />
        </Slider>
      </Container>
    </div>
  );
};
