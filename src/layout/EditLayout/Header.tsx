// FIXME:
/* eslint-disable no-console */
import { PlayIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Button, Progress, Container, createStyles, Header as MantineHeader, Modal, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import { IconCloudStorm, IconDownload } from "@tabler/icons";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { useCallback, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import type { FC, MouseEvent } from "react";
import type { RenderProgressType } from "src/pages/api/progress";
import { activeSceneAtom } from "src/libs/atom/atom";
import { HEADER_HEIGHT } from "src/libs/const";
import { TEMPLATE1_DURATION } from "src/libs/const/remotion-config";
import { selectAllTemplate1Data } from "src/libs/store/features/template1Slice";
import { Template1 } from "src/remotion/Template1";
import { RenderInfo } from "types";

const useStyles = createStyles((theme) => ({
  root: {
    height: HEADER_HEIGHT,
    [theme.fn.smallerThan("md")]: {
      height: 40,
    },
  },
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.fn.smallerThan("md")]: {
      height: 40,
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

/** @package */
export const Header: FC = () => {
  const { classes } = useStyles();
  const [isOpened, setIsOpened] = useState(false);
  const playerRef = useRef<PlayerRef>(null);
  const template1Data = useSelector(selectAllTemplate1Data);
  const activeSceneData = useAtomValue(activeSceneAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [renderInfo, setRenderInfo] = useState<RenderInfo>();
  const [renderStatus, setRenderStatus] = useState<RenderProgressType>();

  useEffect(() => {
    // スクロール禁止
    document.body.style.overflow = "hidden";
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
    <MantineHeader height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.inner} fluid>
        <Link href="/dashboard">
          <div className="flex items-center space-x-1 hover:cursor-pointer">
            <ChevronLeftIcon className="ml-1 h-5 text-blue-500 md:ml-5 md:h-7" />
            <Text className="text-xs font-bold text-blue-500 md:text-sm">戻る</Text>
          </div>
        </Link>
        <div
          className="flex cursor-pointer items-center space-x-1 rounded-lg bg-red-400 py-1 pr-4 pl-2 hover:bg-red-500 md:rounded-xl"
          onClick={() => setIsOpened(true)}
        >
          <PlayIcon className="h-5 text-white md:h-7" />
          <Text className="text-xs font-bold text-white md:text-sm">12秒</Text>
        </div>
      </Container>
      <Modal
        opened={isOpened}
        onClose={() => setIsOpened(false)}
        withCloseButton={false}
        centered
        size="100%"
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        className="m-0 p-0"
      >
        <div className="mb-5 flex flex-col">
          {/** 書き出しボタン */}
          <div>
            {renderStatus?.type === "success" ? null : (
              <Progress value={renderStatus?.percent ? renderStatus?.percent * 100 : 0} />
            )}
            {renderStatus?.type === "success" ? (
              <NextLink href={renderStatus.url} target="_blank">
                <Button
                  component="a"
                  leftIcon={<IconDownload size={18} />}
                  className="mt-3 w-full rounded-full bg-red-400 hover:bg-red-500"
                >
                  ダウンロード
                </Button>
              </NextLink>
            ) : (
              <Button
                type="button"
                leftIcon={<IconCloudStorm size={18} />}
                loading={isLoading}
                onClick={handleSubmit}
                className="mt-3 w-full rounded-full"
              >
                {isLoading ? "書き出し中" : "Render"}
              </Button>
            )}
          </div>
        </div>
        <div className="border shadow-lg">
          <RemotionPlayer
            ref={playerRef}
            component={Template1}
            inputProps={template1Data}
            durationInFrames={TEMPLATE1_DURATION}
            compositionWidth={1920}
            compositionHeight={1080}
            style={{ width: "100%" }}
            fps={30}
            controls
            autoPlay
            loop
          />
        </div>
      </Modal>
    </MantineHeader>
  );
};
