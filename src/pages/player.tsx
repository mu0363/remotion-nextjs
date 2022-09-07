// FIXME:
/* eslint-disable no-console */
import { FunnelIcon, PlayIcon, PauseIcon, MusicalNoteIcon } from "@heroicons/react/24/solid";
import { Avatar, Drawer, Group, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import { useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useSound from "use-sound";
import type { CustomNextPage } from "next";
import type { FC, RefObject } from "react";
import { Form } from "src/components/Form";
import { TimelineCard } from "src/components/TimelineCard";
import { EditLayout } from "src/layout/EditLayout";
import { videConfigAtom } from "src/libs/atom";
import { activeSceneAtom, currentMusicAtom, isPlayingAtom } from "src/libs/atom/atom";
import { TEMPLATE1_DURATION, timelineScenes, musicList } from "src/libs/const/remotion-config";
import { selectAllTemplate1Data } from "src/libs/store/features/template1Slice";
import { Template1 } from "src/remotion/Template1";
import { MusicType } from "types";

const Player: CustomNextPage = () => {
  const [isDrawerOpened, handlers] = useDisclosure(false);
  const template1Data = useSelector(selectAllTemplate1Data);
  const activeSceneData = useAtomValue(activeSceneAtom);
  const currentMusicData = useAtomValue(currentMusicAtom);
  const { currentFrame } = useAtomValue(videConfigAtom);
  const playerRef = useRef<PlayerRef>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

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
          />

          {/** 再生バー */}
          <div className="relative z-20 hidden md:flex" style={{ left: currentFrame + 90 }} ref={dragRef}>
            <div className="absolute">
              <div className="absolute cursor-grab active:cursor-grabbing">
                <FunnelIcon className="w-6 text-gray-600" />
              </div>
              <div className="absolute left-2.5 top-1 rounded-full bg-gray-600 py-11 px-0.5" />
            </div>
          </div>

          {/** mobile再生バー */}
          <div className="relative flex items-center justify-center md:hidden">
            <div className="absolute z-20 mt-12 scroll-auto rounded-full bg-gray-600 py-9 px-0.5" />
          </div>
          <div className="mx-0 mt-1 md:mr-5 md:mt-2">
            <div className="relative flex items-center">
              <PlayButton playerRef={playerRef} />
              <div className="flex overflow-x-auto pl-48 md:pl-[100px]" ref={scrollRef}>
                {timelineScenes.map((card) => (
                  <div key={card.id}>
                    <TimelineCard card={card} playerRef={playerRef} />
                  </div>
                ))}

                <div className="px-24 md:px-0" />
              </div>
              {/* <AudioWaveform /> */}
            </div>
          </div>
          <div className="flex items-center justify-between space-x-6 px-6 md:pl-7 md:pr-0">
            <p className="text-xs font-bold text-gray-600">{calculateTime(currentFrame)}</p>
            <div
              className="flex cursor-pointer items-center space-x-1 rounded-full bg-orange-400 py-1 px-3 hover:bg-orange-500"
              onClick={() => handlers.open()}
            >
              <MusicalNoteIcon className="h-3 text-white" />
              <p className="text-xs font-bold text-white">{currentMusicData.name}</p>
            </div>
          </div>

          {/** 入力フォーム */}
          <div className="mx-5 pt-5 md:hidden">
            <Form />
          </div>
        </div>
      </div>
      <Drawer
        opened={isDrawerOpened}
        onClose={() => handlers.close()}
        title={
          <div className="flex items-center space-x-2">
            <MusicalNoteIcon className="h-7 cursor-pointer rounded-full bg-orange-400 p-1.5 text-white hover:bg-orange-500" />
            <div className="font-bold text-gray-600">BGMを選択</div>
          </div>
        }
        padding="xl"
        size="md"
        position="right"
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <div className="space-y-5">
          {musicList.map((musicData) => (
            <MusicCard key={musicData.id} musicData={musicData} />
          ))}
        </div>
      </Drawer>
    </div>
  );
};

Player.getLayout = EditLayout;

export default Player;

type PlayButtonProps = {
  playerRef: RefObject<PlayerRef>;
};

const PlayButton: FC<PlayButtonProps> = ({ playerRef }) => {
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const activeSceneData = useAtomValue(activeSceneAtom);

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
          className="mx-5"
          onClick={() => {
            playerRef.current?.toggle();
            setIsPlaying(!isPlaying);
          }}
        >
          {isPlaying ? (
            <PauseIcon className="h-12 cursor-pointer rounded-full border-2 bg-white p-2 text-gray-600 shadow-md hover:bg-gray-100" />
          ) : (
            <PlayIcon className="h-12 cursor-pointer rounded-full border-2 bg-white p-2 text-gray-600 shadow-md hover:bg-gray-100" />
          )}
        </div>
      </div>
    </div>
  );
};

const MusicCard: FC<{ musicData: MusicType }> = ({ musicData }) => {
  const [play, { stop }] = useSound(musicData.music, { interrupt: true });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <UnstyledButton key={musicData.id}>
      <Group>
        <div
          onClick={() => {
            if (isPlaying) {
              stop();
              setIsPlaying(false);
            } else {
              play();
              setIsPlaying(true);
            }
          }}
        >
          {isPlaying ? <PauseIcon className="h-6 text-gray-600" /> : <PlayIcon className="h-6 text-gray-600" />}
        </div>
        <Avatar size={40} src={musicData.thumbnail} />
        <div>
          <Text lineClamp={1}>{musicData.name}</Text>
          <Text size="xs" color="dimmed">
            {musicData.artist}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
};
