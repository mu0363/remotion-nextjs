// FIXME:
/* eslint-disable no-console */
import {
  Button,
  Container,
  createStyles,
  Group,
  Header as MantineHeader,
  MediaQuery,
  Progress,
  Text,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { IconCloudStorm, IconArrowLeft } from "@tabler/icons";
import { useCallback, useEffect, useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import type { FC } from "react";
import { HEADER_HEIGHT } from "src/libs/const";
import { selectAllTemplate1Data } from "src/libs/store/features/template1Slice";
import { RenderProgressType } from "src/pages/api/progress";
import { RenderInfo } from "types";

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
  const [isLoading, setIsLoading] = useState(false);
  const [renderInfo, setRenderInfo] = useState<RenderInfo>();
  const [renderStatus, setRenderStatus] = useState<RenderProgressType>();
  const template1Data = useSelector(selectAllTemplate1Data);

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
    <MediaQuery smallerThan="md" styles={{ display: "none" }}>
      <MantineHeader height={HEADER_HEIGHT}>
        <Container className={classes.inner} fluid>
          <Group>
            <Button component="a" href="/dashboard" leftIcon={<IconArrowLeft />} variant="subtle">
              戻る
            </Button>
          </Group>
          <Group grow>
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
              radius="xl"
              sx={{ height: 36, width: 250 }}
              onClick={handleSubmit}
            >
              {isLoading ? "書き出し中" : "Render"}
            </Button>
          </Group>
        </Container>
      </MantineHeader>
    </MediaQuery>
  );
};
