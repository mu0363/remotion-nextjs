import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import type { ChangeEvent, FC } from "react";

const Container = styled.div`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayerContainer = styled.div`
  position: relative;
`;

const PlayerButton = styled.button<{ isPlaying: boolean }>`
  position: absolute;
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  visibility: ${(props) => (props.isPlaying ? "hidden" : "visible")};
  background: rgba(0, 0, 0, 0.4);
  border: 4px solid rgba(255, 255, 255, 1);
  z-index: 2;
  :hover {
    background: rgba(0, 0, 0, 0.2);
    border: 4px solid rgba(255, 255, 255, 0.8);
  }
`;

const RangeBase = css`
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
    background: #f2cb0a;
  }
`;

const RangeLeft = styled.input`
  z-index: 4;

  ${RangeBase}
  &::-webkit-slider-thumb {
    border-top-left-radius: 0.5em;
    border-bottom-left-radius: 0.5em;
    width: 20px;
  }
`;

const RangeCenter = styled.input<{ minPercent: number; maxPercent: number }>`
  z-index: 3;
  ${RangeBase}
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    pointer-events: all;
    position: relative;
    cursor: grab;
    &:active {
      cursor: grabbing;
    }

    border: none;
    height: 30px;
    width: 30px;
    border-radius: 0.5em;
    /* width: ${(props) => `${props.maxPercent - props.minPercent - 5}%`}; */
    background: #f2cb0a;
  }
`;

const RangeRight = styled.input`
  z-index: 4;

  ${RangeBase}
  &::-webkit-slider-thumb {
    border-top-right-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    width: 20px;
  }
`;

const Slider = styled.div`
  position: relative;
  width: 95%;
`;

const SliderBox = styled.div<{ minPercent: number; maxPercent: number }>`
  position: absolute;
  height: 56px;
  margin-top: -28px;
  border-top: 6px solid #f2cb0a;
  border-bottom: 6px solid #f2cb0a;

  left: ${(props) => `${props.minPercent}%`};
  right: ${(props) => `${100 - props.maxPercent}%`};
  background: #eeeeee;
  z-index: 2;
`;

/** @package */
export const VideoTrimerFixDuration: FC = () => {
  const gap = 3; // second
  const [minVal, setMinVal] = useState(0);
  const [middleVal, setMiddleVal] = useState(500);
  const [maxVal, setMaxVal] = useState(1000);
  const [minPercent, setMinPercent] = useState(0);
  const [maxPercent, setMaxPercent] = useState(100);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);

  const playerRef = useRef<ReactPlayer>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // パーセントに変換
  const getPercent = useCallback((value: number) => Math.round((value / duration) * 100), [duration]);

  // 中間値を計算
  const getMiddle = useCallback((minVal: number, maxVal: number) => (maxVal - minVal) / 2 + minVal, []);

  // 真ん中のレンジスライダー
  useEffect(() => {
    setMiddleVal(getMiddle(minVal, maxVal));
    playerRef.current?.seekTo(minVal, "seconds");
    setIsPlaying(false);
  }, [minVal, maxVal, getPercent, getMiddle]);

  // 右のレンジスライダー
  useEffect(() => {
    setMaxPercent(getPercent(maxVal));
    playerRef.current?.seekTo(maxVal, "seconds");
    setIsPlaying(false);
  }, [maxVal, getPercent]);

  // 左のレンジスライダー
  useEffect(() => {
    setMinPercent(getPercent(minVal));
    playerRef.current?.seekTo(minVal, "seconds");
    setIsPlaying(false);
  }, [minVal, getPercent]);

  const slideTrimBox = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const diff = middleVal - Number(event.target.value);
      setMaxVal((prev) => prev - diff);
      setMinVal((prev) => prev - diff);
      // setMiddleVal(Number(event.target.value) + diff);
      // setMiddleVal(Number(event.target.value) + diff);
    },
    [middleVal]
  );

  // React Player
  const onReady = useCallback(() => {
    if (!isReady) {
      playerRef.current?.seekTo(minVal, "seconds");
      const videoDuration = playerRef.current?.getDuration();
      if (videoDuration) {
        setDuration(videoDuration);
        setMaxVal(videoDuration);
        setMiddleVal(videoDuration / 2);
      }
      setIsReady(true);
    }
  }, [isReady, minVal]);

  return (
    <div>
      <p>{`duration: ${duration}`}</p>
      <p>{`minVal: ${minVal}`}</p>
      <p>{`maxVal: ${maxVal}`}</p>
      <p>{`middleVal: ${middleVal}`}</p>
      <p>{`min%: ${minPercent}`}</p>
      <p>{`max%: ${`${maxPercent}`}`}</p>
      <p>{`currentTime: ${`${currentTime}`}`}</p>

      <PlayerContainer>
        <PlayerButton
          isPlaying={isPlaying}
          onClick={() => {
            playerRef.current?.seekTo(minVal, "seconds");
            setIsPlaying(!isPlaying);
          }}
        >
          <PlayIcon className="mx-auto h-10 pl-1 text-white" />
        </PlayerButton>
        <ReactPlayer
          url="https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/videos/SportsDay2022.mp4?t=2022-10-26T06%3A48%3A31.064Z"
          // url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          width="100%"
          height="100%"
          playing={isPlaying}
          ref={playerRef}
          onReady={onReady}
          onPlay={() => setIsPlaying(true)}
          onProgress={(state) => {
            setCurrentTime(state.playedSeconds);
            if (state.playedSeconds > Math.floor(maxVal)) {
              setIsPlaying(false);
            }
          }}
        />
        <p className="font-bold">{`${Math.floor(minVal / 60)}:${String(Math.floor(minVal % 60)).padStart(
          2,
          "0"
        )} / ${Math.floor(maxVal / 60)}:${String(Math.floor(maxVal % 60)).padStart(2, "0")}`}</p>
      </PlayerContainer>
      <Container>
        <RangeLeft
          type="range"
          min={0}
          max={duration}
          value={minVal}
          ref={minValRef}
          step="0.01"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(Number(event.target.value), maxVal - gap);
            setMinVal(value);
          }}
        />
        <RangeCenter
          type="range"
          step="0.01"
          minPercent={minPercent}
          maxPercent={maxPercent}
          min={0}
          max={duration}
          value={middleVal}
          onChange={slideTrimBox}
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
