// FIXME:
/* eslint-disable no-console */
import { FunnelIcon, PlayIcon, PauseIcon, MusicalNoteIcon } from "@heroicons/react/24/solid";
import { Avatar, Drawer, Group, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import type { CustomNextPage } from "next";
import type { FC, RefObject } from "react";
import { Form } from "src/components/Form";
import { TimelineCard } from "src/components/TimelineCard";
import { EditLayout } from "src/layout/EditLayout";
import { videConfigAtom } from "src/libs/atom";
import { activeSceneAtom, isPlayingAtom, selectedTemplateAtom } from "src/libs/atom";
import { TEMPLATE1_DURATION, timelineScenes } from "src/libs/const/remotion-config";
import {
  selectAllMusicSliceData,
  selectCurrentMusicSliceData,
  updateMusicList,
} from "src/libs/store/features/musicSlice";
import { selectAllTemplate1Data, updateT1Music } from "src/libs/store/features/template1Slice";
import { selectAllTemplate2Data, updateT2Music } from "src/libs/store/features/template2Slice";
import { Template1 } from "src/remotion/Template1";
import { Template2 } from "src/remotion/Template2";
import { MusicState, SelectedTemplateType, TimelineSceneType } from "types";

const Player: CustomNextPage = () => {
  const router = useRouter();
  const [currentTimelineScene, setCurrentTimelineScene] = useState<TimelineSceneType[]>(timelineScenes.template01);
  const [isDrawerOpened, handlers] = useDisclosure(false);
  const template1Data = useSelector(selectAllTemplate1Data);
  const template2Data = useSelector(selectAllTemplate2Data);
  const currentMusicData = useSelector(selectCurrentMusicSliceData);
  const musicListData = useSelector(selectAllMusicSliceData);
  const activeSceneData = useAtomValue(activeSceneAtom);
  const [selectedTemplate, setSelectedTemplate] = useAtom(selectedTemplateAtom);
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
    const template = router.query.template as SelectedTemplateType;
    setSelectedTemplate(template);
    switch (template) {
      case "template01":
        setCurrentTimelineScene(timelineScenes.template01);
        break;
      case "template02":
        setCurrentTimelineScene(timelineScenes.template02);
        break;
      default:
        setCurrentTimelineScene(timelineScenes.template01);
    }
    setCurrentTimelineScene;
  }, [router.query.template, setSelectedTemplate]);

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
            component={selectedTemplate === "template01" ? Template1 : Template2}
            inputProps={selectedTemplate === "template01" ? template1Data : template2Data}
            durationInFrames={TEMPLATE1_DURATION}
            compositionWidth={1920}
            compositionHeight={1080}
            style={{ width: "100%" }}
            fps={30}
            controls={true}
            loop
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
            <div className="absolute z-20 mt-24 mr-4 scroll-auto rounded-full bg-gray-600 py-9 px-0.5" />
          </div>
          <div className="mx-0 mt-1 md:mr-5 md:mt-2">
            <div className="relative flex items-center">
              <PlayButton playerRef={playerRef} />
              <div className="flex overflow-x-auto pl-48 md:pl-[100px]" ref={scrollRef}>
                {currentTimelineScene.map((card) => (
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
            <Tooltip
              label={<div className="font-bold">BGMを変更</div>}
              color="orange"
              withArrow
              transition="fade"
              transitionDuration={300}
            >
              <div
                className="group flex cursor-pointer items-center space-x-1 rounded-full bg-orange-400 py-1 px-3 hover:bg-orange-500"
                onClick={() => handlers.open()}
              >
                <MusicalNoteIcon className="h-3 text-white" />
                <p className="text-xs font-bold text-white">{currentMusicData.name}</p>
              </div>
            </Tooltip>
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
          {musicListData.map((musicData) => (
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

const MusicCard: FC<{ musicData: MusicState }> = ({ musicData }) => {
  const selectedTemplate = useAtomValue(selectedTemplateAtom);
  const [play, { stop }] = useSound(musicData.music, { interrupt: true });
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="hover:scale-125 hover:cursor-pointer">
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
          {isPlaying ? <PauseIcon className="h-6 text-gray-500" /> : <PlayIcon className="h-6 text-gray-500" />}
        </div>
        <div
          className="flex items-center space-x-2"
          onClick={() => {
            dispatch(updateMusicList({ id: musicData.id }));
            switch (selectedTemplate) {
              case "template01":
                dispatch(updateT1Music({ music: musicData.music }));
                break;
              case "template02":
                dispatch(updateT2Music({ music: musicData.music }));
                break;
              default:
                dispatch(updateT1Music({ music: musicData.music }));
            }
          }}
        >
          <Avatar size={40} src={musicData.thumbnail} />
          <div>
            <div className={`text-gray-600 ${musicData.isSelected ? "font-bold text-orange-500" : ""}`}>
              {musicData.name}
            </div>
            <Text size="xs" color="dimmed">
              {musicData.artist}
            </Text>
          </div>
        </div>
      </Group>
    </div>
  );
};
