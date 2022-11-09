// FIXME:
/* eslint-disable no-console */
import styled from "@emotion/styled";
import { PlayIcon, PauseIcon, MusicalNoteIcon } from "@heroicons/react/24/solid";
import { Avatar, Drawer, Group, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import { Form } from "src/components/Form";
import { TimelineCard } from "src/components/TimelineCard";
import { EditLayout } from "src/layout/EditLayout";
import { videConfigAtom } from "src/libs/atom";
import { activeSceneAtom, isPlayingAtom, selectedTemplateAtom } from "src/libs/atom";
import { TEMPLATE1_DURATION, timelineScenes } from "src/libs/const/remotion-config";
import { useLineImage } from "src/libs/hooks/useLineImage";
import {
  selectAllMusicSliceData,
  selectCurrentMusicSliceData,
  updateMusicList,
} from "src/libs/store/features/musicSlice";
import { selectAllTemplate1Data, updateT1Music } from "src/libs/store/features/template1Slice";
import { selectAllTemplate2Data, updateT2Music } from "src/libs/store/features/template2Slice";
import { Template1 } from "src/remotion/Template1";
import { Template2 } from "src/remotion/Template2";
import type { NextPage } from "next";
import type { FC, RefObject, ChangeEvent } from "react";
import type { MusicState, SelectedTemplateType, TimelineSceneType } from "src/types";

const Timeline = styled.div`
  position: relative;
`;

const TimelineSlider = styled.input<{ sliderLength: number }>`
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  pointer-events: none;
  height: 0;
  width: ${(props) => `${props.sliderLength}px`};
  outline: none;
  position: absolute;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    pointer-events: all;
    cursor: grab;
    :active {
      cursor: grabbing;
    }
    position: relative;
    z-index: 4;

    border: none;
    width: 1.2rem;
    height: 6rem;
    margin-top: 5rem;

    background-image: url("/timelineBar.svg");
  }
`;

const TimelineCardDiv = styled.div`
  position: absolute;
  display: flex;
`;

const Player: NextPage = () => {
  const router = useRouter();
  const [currentTimelineScene, setCurrentTimelineScene] = useState<TimelineSceneType[]>(timelineScenes.template01);
  const [sliderLength, setSliderLength] = useState(0);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const [isDrawerOpened, handlers] = useDisclosure(false);
  const template1Data = useSelector(selectAllTemplate1Data);
  const template2Data = useSelector(selectAllTemplate2Data);
  const currentMusicData = useSelector(selectCurrentMusicSliceData);
  const musicListData = useSelector(selectAllMusicSliceData);
  const [selectedTemplate, setSelectedTemplate] = useAtom(selectedTemplateAtom);
  const { currentFrame } = useAtomValue(videConfigAtom);
  const playerRef = useRef<PlayerRef>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const calculateTime = (fps: number) => {
    const minute = Math.floor(fps / (30 * 60));
    const second = Math.floor(fps / 30);
    const padSecond = String(second).padStart(2, "0");
    return `${minute}:${padSecond}`;
  };

  const getOffset = useCallback(() => {
    if (scrollRef.current && playerRef.current) {
      playerRef.current.seekTo(scrollRef.current.scrollLeft);
    }
  }, []);

  const getSliderLength = (sceneCount: number) => {
    // カード1枚が112px、間が8px
    return sceneCount * 112 + (sceneCount - 1) * 8;
  };

  const seekTimeline = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setIsPlaying(false);
      if (playerRef.current) {
        playerRef.current.seekTo(Number(event.target.value));
      }
    },
    [setIsPlaying]
  );

  useLineImage();

  // カードの枚数を入力してタイムラインスライダーの長さを取得
  useEffect(() => {
    setSliderLength(getSliderLength(3));
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
    window.addEventListener("touchmove", getOffset);
  }, [getOffset]);

  return (
    <EditLayout>
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
            loop
          />
          <div className="my-5 flex justify-end">
            <div>
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
          </div>

          {/** mobile再生バー */}
          <div className="relative flex items-center justify-center md:hidden">
            <div className="absolute z-20 mt-24 mr-4 scroll-auto rounded-full bg-gray-600 py-9 px-0.5" />
          </div>

          <div className="flex">
            <div className="mt-2 mr-5 flex flex-col items-center space-y-2">
              <PlayButton playerRef={playerRef} />
              <p className="text-xs font-bold text-gray-600">{calculateTime(currentFrame)}</p>
            </div>
            <Timeline>
              <TimelineSlider
                type="range"
                min={0}
                max={TEMPLATE1_DURATION}
                step="0.01"
                value={currentFrame}
                onChange={(event) => seekTimeline(event)}
                sliderLength={sliderLength}
              />
              <TimelineCardDiv ref={scrollRef}>
                {currentTimelineScene.map((card) => (
                  <div key={card.id}>
                    <TimelineCard card={card} playerRef={playerRef} />
                  </div>
                ))}
              </TimelineCardDiv>
            </Timeline>
            {/* <AudioWaveform /> */}
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
            <MusicCard key={musicData.id} musicData={musicData} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
          ))}
        </div>
      </Drawer>
    </EditLayout>
  );
};

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
    <div
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
  );
};

const MusicCard: FC<{ musicData: MusicState; isPlaying: boolean; setIsPlaying: (isPlaying: boolean) => void }> = ({
  musicData,
  isPlaying,
  setIsPlaying,
}) => {
  const selectedTemplate = useAtomValue(selectedTemplateAtom);
  const [play, { stop }] = useSound(musicData.music, { interrupt: true });
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
