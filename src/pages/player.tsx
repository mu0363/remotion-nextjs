// FIXME:
/* eslint-disable no-console */
import { ActionIcon, Button, Progress, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import { IconPlayerPlay, IconPlayerPause, IconCloudStorm } from "@tabler/icons";
import { useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RenderProgressType } from "./api/progress";
import type { CustomNextPage } from "next";
import type { FC, MouseEvent, RefObject } from "react";
import { Form } from "src/components/Form";
import { TimelineCard } from "src/components/TimelineCard";
import { EditLayout } from "src/layout/EditLayout";
import { currentFrameAtom } from "src/libs/atom";
import { activeSceneAtom, isPlayingAtom } from "src/libs/atom/atom";
import { TEMPLATE1_DURATION, timelineScenes } from "src/libs/const/remotion-config";
import { ActiveSceneSlice } from "src/libs/store/features/activeSceneSlice";
import { selectAllTemplate1Data } from "src/libs/store/features/template1Slice";
import { Template1 } from "src/remotion/Template1";
import { RenderInfo } from "types";

// FIXME: スクロール禁止(useEffect内に実装する)
// document.body.style.overflow = "hidden";

const Player: CustomNextPage = () => {
  const template1Data = useSelector(selectAllTemplate1Data);
  const activeSceneData = useAtomValue(activeSceneAtom);
  const playerRef = useRef<PlayerRef>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [renderInfo, setRenderInfo] = useState<RenderInfo>();
  const [renderStatus, setRenderStatus] = useState<RenderProgressType>();

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.seekTo(activeSceneData.from);
    }
  }, [activeSceneData]);

  const timeout = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // 書き出し進捗確認
  const pollProgress = useCallback(async (renderInfo: RenderInfo): Promise<void> => {
    const poll = async () => {
      const progress = await fetch("/api/progress", {
        method: "POST",
        body: JSON.stringify({
          renderInfo,
        }),
      });
      const progressJson = (await progress.json()) as RenderProgressType;
      setRenderStatus(progressJson);
    };

    await timeout(1000);
    await poll();
  }, []);

  // 1秒ごとに状況確認
  useEffect(() => {
    const poll = async (renderInfo: RenderInfo) => {
      await pollProgress(renderInfo);
      console.log(renderStatus);
    };

    if (renderStatus?.type === "success") {
      setIsLoading(false);
      console.log(renderStatus);
    }

    if (renderStatus?.type === "progress" && renderInfo) {
      void poll(renderInfo);
    }
  }, [renderStatus, pollProgress, renderInfo, template1Data]);

  // 書き出し開始
  const renderStart = async () => {
    const renderStartRes = await fetch("/api/render", {
      method: "POST",
      body: JSON.stringify(template1Data),
    });
    // FIXME: アサーション削除
    const renderInfo = (await renderStartRes.json()) as RenderInfo;
    setRenderInfo(renderInfo);
    return renderInfo;
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // FIXME: try-catch入れる
    (async () => {
      const renderInfo = await renderStart();
      await pollProgress(renderInfo);
    })().catch((err) => console.log(err));
  };

  return (
    <div>
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
          controls={false}
          autoPlay
          loop
        />
      </div>
      <div className="mx-0 md:mx-5">
        <div className="flex items-center">
          <PlayButton playerRef={playerRef} activeSceneData={activeSceneData} />
          <div className="flex overflow-x-auto">
            {timelineScenes.map((card) => (
              <div key={card.id}>
                <TimelineCard card={card} playerRef={playerRef} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/** 入力フォーム */}
      <div className="mx-5 pt-5 md:hidden">
        <Form />
      </div>

      {/** 書き出しボタン */}
      <div className="mx-5 mt-10 md:mx-10">
        {renderStatus?.type === "success" && (
          <NextLink href={renderStatus.url} target="_blank">
            <Text sx={{ fontWeight: "bold" }}>🎉</Text>
          </NextLink>
        )}
        <Progress value={renderStatus?.percent ? renderStatus?.percent * 100 : 0} />
        <Button
          type="button"
          leftIcon={<IconCloudStorm size={18} />}
          loading={isLoading}
          onClick={handleSubmit}
          className="mt-3 w-full rounded-full"
        >
          {isLoading ? "書き出し中" : "Render"}
        </Button>
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
  const currentFrame = useAtomValue(currentFrameAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.seekTo(activeSceneData.from);
    }
  }, [activeSceneData, playerRef]);

  const calculateTime = (fps: number) => {
    const minute = Math.floor(fps / (30 * 60));
    const second = Math.floor(fps / 30);
    const padSecond = String(second).padStart(2, "0");
    return `${minute}:${padSecond}`;
  };

  return (
    <div className="flex flex-col items-center">
      <ActionIcon
        color="red"
        size="lg"
        radius="xl"
        variant="filled"
        className="mx-5 shadow-md"
        onClick={() => {
          playerRef.current?.toggle();
          setIsPlaying(!isPlaying);
        }}
      >
        {isPlaying ? <IconPlayerPause size={18} /> : <IconPlayerPlay size={18} />}
      </ActionIcon>
      <p className="mx-5 mt-2 text-xs font-bold text-gray-600">{calculateTime(currentFrame)}</p>
    </div>
  );
};
