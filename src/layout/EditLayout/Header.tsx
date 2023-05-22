// FIXME:
/* eslint-disable no-console */
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Button, Container, createStyles, Header as MantineHeader, Modal } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { IconCloudStorm, IconDownload } from "@tabler/icons";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { useCallback, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { activeSceneAtom, selectedTemplateAtom } from "src/libs/atom/atom";
import { HEADER_HEIGHT, HEADER_HEIGHT_SM } from "src/libs/const";
import { selectAllTemplate1Data } from "src/libs/store/features/template1Slice";
import { selectAllTemplate2Data } from "src/libs/store/features/template2Slice";
import type { PlayerRef } from "@remotion/player";
import type { FC, MouseEvent } from "react";
import type { RenderProgressType } from "src/pages/api/progress";
import type { RenderInfo } from "src/types";

const useStyles = createStyles((theme) => ({
  root: {
    height: HEADER_HEIGHT,
    [theme.fn.smallerThan("md")]: {
      height: HEADER_HEIGHT_SM,
    },
  },
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.fn.smallerThan("md")]: {
      height: HEADER_HEIGHT_SM,
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
  const [isLoading, setIsLoading] = useState(false);
  const [renderInfo, setRenderInfo] = useState<RenderInfo>();
  const [renderStatus, setRenderStatus] = useState<RenderProgressType>();
  const playerRef = useRef<PlayerRef>(null);
  const selectedTemplate = useAtomValue(selectedTemplateAtom);
  const template1Data = useSelector(selectAllTemplate1Data);
  const template2Data = useSelector(selectAllTemplate2Data);
  const activeSceneData = useAtomValue(activeSceneAtom);

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
      console.log({ progressJson });

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

    if (renderStatus?.type === "error") {
      setIsLoading(false);
      console.log(renderStatus);
    }

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
    const selectedTemplateData = selectedTemplate === "template01" ? template1Data : template2Data;
    const renderStartRes = await fetch("/api/render", {
      method: "POST",
      body: JSON.stringify(selectedTemplateData),
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
            <ChevronLeftIcon className="ml-1 h-6 text-gray-600 md:ml-5 md:h-7" />
            <div
              className="text-sm font-bold text-gray-600 md:text-base"
              // style={{ fontFamily: "BIZ UDPGothic", fontWeight: "bold" }}
            >
              戻る
            </div>
          </div>
        </Link>

        <Button
          type="button"
          radius="xl"
          color="red"
          leftIcon={<IconCloudStorm size={18} />}
          onClick={() => setIsOpened(true)}
        >
          Render
        </Button>
      </Container>
      <Modal
        opened={isOpened}
        onClose={() => setIsOpened(false)}
        overlayOpacity={0.55}
        overlayBlur={3}
        centered
        size="md"
        transition="fade"
        transitionDuration={300}
        transitionTimingFunction="ease"
        className="m-0 p-0"
      >
        <div className="mx-10">
          {/** 書き出しボタン */}

          {renderStatus?.type === "success" ? (
            <div className="flex flex-col items-center">
              <p className="text-2xl font-bold text-gray-600">完了しました！</p>
              <NextLink href={renderStatus.url} target="_blank">
                <Button radius="xl" color="cyan" leftIcon={<IconDownload size={18} />} className="my-10">
                  ダウンロード
                </Button>
              </NextLink>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {isLoading ? (
                <p className="text-2xl font-bold text-gray-600">書き出し中です...</p>
              ) : (
                <p className="text-2xl font-bold text-gray-600">本当に書き出しますか?</p>
              )}
              <Button
                type="button"
                radius="xl"
                color="red"
                leftIcon={<IconCloudStorm size={18} />}
                loading={isLoading}
                onClick={handleSubmit}
                className="my-10"
              >
                {isLoading
                  ? `書き出し中 ${renderStatus?.percent ? Math.round(renderStatus?.percent * 100) : 0}%`
                  : "映像へ書き出す"}
              </Button>
            </div>
          )}
        </div>
        {/* {renderStatus?.type === "success" ? null : (
            <Progress value={renderStatus?.percent ? renderStatus?.percent * 100 : 0} />
          )} */}
      </Modal>
    </MantineHeader>
  );
};
