// FIXME:
/* eslint-disable no-console */
import { Button, Center, Progress, Stack, Text, TextInput } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { IconCloudStorm } from "@tabler/icons";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RenderInfo } from "src/libs/firebase/server";
import { RenderProgressType } from "src/pages/api/progress";
import { FirstPageState, selectAllText, updateText } from "src/store/features/firstPageSlice";

/** @package */
export const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [renderInfo, setRenderInfo] = useState<RenderInfo>();
  const [renderStatus, setRenderStatus] = useState<RenderProgressType>();
  const dispatch = useDispatch();
  const firstPageData = useSelector(selectAllText);

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

    if (renderStatus?.type === "success") {
      setIsLoading(false);
      console.log(renderStatus);
    }

    if (renderStatus?.type === "progress" && renderInfo) {
      void poll(renderInfo);
    }
  }, [renderStatus, pollProgress, renderInfo]);

  // 書き出し開始
  const renderStart = async () => {
    const formData: FirstPageState = {
      title: firstPageData.title,
      imageUrl: firstPageData.imageUrl,
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
    dispatch(updateText({ title: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    (async () => {
      const renderInfo = await renderStart();
      await pollProgress(renderInfo);
    })().catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <Stack>
          <TextInput onChange={handleChange} size="lg" value={firstPageData.title} />
        </Stack>
        <Button
          type="submit"
          leftIcon={<IconCloudStorm size={18} />}
          loading={isLoading}
          radius="xl"
          sx={{ height: 50 }}
        >
          {isLoading ? "書き出し中" : "Render"}
        </Button>
        <Progress value={renderStatus?.percent ? renderStatus?.percent * 100 : 0} />
        <Center>
          {renderStatus?.type === "success" && (
            <NextLink href={renderStatus.url} target="_blank">
              <Text sx={{ fontWeight: "bold" }}>🎉🎉 Ta-da!! Check the video 🎉🎉</Text>
            </NextLink>
          )}
        </Center>
      </Stack>
    </form>
  );
};
