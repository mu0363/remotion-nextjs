// FIXME:
/* eslint-disable no-console */
import { FunnelIcon, PlayIcon, PauseIcon } from "@heroicons/react/24/solid";
import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import { useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import type { CustomNextPage } from "next";
import type { FC, RefObject } from "react";
import { Form } from "src/components/Form";
import { TimelineCard } from "src/components/TimelineCard";
import { EditLayout } from "src/layout/EditLayout";
import { videConfigAtom } from "src/libs/atom";
import { activeSceneAtom, isPlayingAtom } from "src/libs/atom/atom";
import { TEMPLATE1_DURATION, timelineScenes } from "src/libs/const/remotion-config";
import { ActiveSceneSlice } from "src/libs/store/features/activeSceneSlice";
import { selectAllTemplate1Data } from "src/libs/store/features/template1Slice";
import { Template1 } from "src/remotion/Template1";

const Player: CustomNextPage = () => {
  const template1Data = useSelector(selectAllTemplate1Data);
  const activeSceneData = useAtomValue(activeSceneAtom);
  const playerRef = useRef<PlayerRef>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const { currentFrame } = useAtomValue(videConfigAtom);

  const calculateTime = (fps: number) => {
    const minute = Math.floor(fps / (30 * 60));
    const second = Math.floor(fps / 30);
    const padSecond = String(second).padStart(2, "0");
    return `${minute}:${padSecond}`;
  };

  const getOffset = useCallback(() => {
    if (scrollRef.current && playerRef.current) {
      playerRef.current.seekTo(scrollRef.current.scrollLeft);
      dragRef.current;
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += (currentFrame + 1000) / 1000;
    }
  }, [currentFrame]);

  useEffect(() => {
    getOffset();
  }, [getOffset]);

  useEffect(() => {
    window.addEventListener("touchmove", getOffset);
  }, [getOffset]);

  useEffect(() => {
    // prevent scroll
    document.body.style.overflow = "hidden";
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.seekTo(activeSceneData.from);
    }
  }, [activeSceneData]);

  useEffect(() => {
    if (dragRef.current) {
      console.log(dragRef.current.offsetLeft);
    }
  }, [dragRef]);

  return (
    <div>
      <div className="fixed w-full md:static">
        <div className="mx-0 pt-0 md:mx-10 md:pt-10">
          <RemotionPlayer
            ref={playerRef}
            component={Template1}
            inputProps={template1Data}
            durationInFrames={TEMPLATE1_DURATION}
            compositionWidth={1920}
            compositionHeight={1080}
            style={{ width: "100%" }}
            fps={30}
            controls={true}
            autoPlay
          />
        </div>

        {/** 再生バー */}
        <div className="relative z-20 hidden md:flex" style={{ left: currentFrame + 90 }} ref={dragRef}>
          <div className="absolute">
            <div className="absolute cursor-grab">
              <FunnelIcon className="w-6 text-gray-600" />
            </div>
            <div className="absolute left-2.5 top-1 rounded-full bg-gray-600 py-10 px-0.5" />
          </div>
        </div>

        {/** mobile再生バー */}
        <div className="relative flex items-center justify-center md:hidden">
          <div className="absolute z-20 mt-11 scroll-auto rounded-full bg-gray-600 py-9 px-0.5" />
        </div>
        <div className="mx-0 mt-1 md:mx-5">
          <div className="relative flex items-center">
            <PlayButton playerRef={playerRef} activeSceneData={activeSceneData} />
            <div className="flex overflow-x-auto pl-48 md:pl-20" ref={scrollRef}>
              {timelineScenes.map((card) => (
                <div key={card.id}>
                  <TimelineCard card={card} playerRef={playerRef} />
                </div>
              ))}

              <div className="px-24 md:px-0" />
            </div>
          </div>
        </div>
        <p className="mx-5 mt-2 text-xs font-bold text-gray-600">{calculateTime(currentFrame)}</p>

        {/** 入力フォーム */}
        <div className="mx-5 pt-5 md:hidden">
          <Form />
        </div>
      </div>
    </div>
  );
};

Player.getLayout = EditLayout;

export default Player;

type PlayButtonProps = {
  playerRef: RefObject<PlayerRef>;
  activeSceneData: ActiveSceneSlice;
};

const PlayButton: FC<PlayButtonProps> = ({ playerRef, activeSceneData }) => {
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.seekTo(activeSceneData.from);
    }
  }, [activeSceneData, playerRef]);

  return (
    <div className="absolute z-20">
      <div className="flex flex-col items-center">
        <div
          className="mx-5 bg-gray-50 hover:bg-blue-50"
          onClick={() => {
            playerRef.current?.toggle();
            setIsPlaying(!isPlaying);
          }}
        >
          {isPlaying ? (
            <PauseIcon className="h-12 rounded-full border-2 p-2 text-blue-400 shadow-md" />
          ) : (
            <PlayIcon className="h-12 rounded-full border-2 p-2 text-blue-400 shadow-md" />
          )}
        </div>
      </div>
    </div>
  );
};
