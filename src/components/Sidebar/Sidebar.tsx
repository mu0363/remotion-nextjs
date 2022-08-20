// FIXME:
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-console */
import { Aside, Button, Center, MediaQuery, Progress, Stack, Text, TextInput } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { IconMovie } from "@tabler/icons";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { FC } from "react";
import { RenderInfo } from "src/libs/firebase/server";
import { RenderProgressType } from "src/pages/api/progress";
import { selectAllText, updateText } from "src/store/features/textSlice";

type TextForm = {
  firstText: string;
};

export const Sidebar: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [renderInfo, setRenderInfo] = useState<RenderInfo>();
  const [renderStatus, setRenderStatus] = useState<RenderProgressType>();
  const dispatch = useDispatch();
  const texts = useSelector(selectAllText);

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
    const timeout = (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
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

    if (renderStatus?.type == "success") {
      setIsLoading(false);
      console.log(renderStatus);
    }

    if (renderStatus?.type == "progress" && renderInfo) {
      void poll(renderInfo);
    }
  }, [renderStatus, pollProgress, renderInfo]);

  // 書き出し開始
  const renderStart = async () => {
    const formData: TextForm = {
      firstText: texts.firstText,
    };
    const renderStartRes = await fetch("/api/render", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    // FIXME: アサーション削除
    const renderInfo = (await renderStartRes.json()) as RenderInfo;
    setRenderInfo(renderInfo);
    return renderInfo;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateText({ firstText: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const renderInfo = await renderStart();
    await pollProgress(renderInfo);
  };

  return (
    <MediaQuery smallerThan="md" styles={{ display: "none" }}>
      <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 300 }}>
        <Stack>
          <form onSubmit={handleSubmit}>
            <Stack>
              <TextInput onChange={handleChange} size="lg" />
              <Button type="submit" leftIcon={<IconMovie size={14} />} loading={isLoading}>
                {isLoading ? "書き出し中" : "Create your Video"}
              </Button>
            </Stack>
          </form>
          <Progress value={renderStatus?.percent ? renderStatus?.percent * 100 : 0} />
          <Center>
            {renderStatus?.type == "success" && (
              <NextLink href={renderStatus.url} target="_blank">
                <Text sx={{ fontWeight: "bold" }}>🎉🎉 Ta-da!! Check the video 🎉🎉</Text>
              </NextLink>
            )}
          </Center>
        </Stack>
      </Aside>
    </MediaQuery>
  );
};
