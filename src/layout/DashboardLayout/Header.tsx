// FIXME:
/* eslint-disable no-console */
import { Button, Group, Header as MantineHeader, Progress, Stack, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { IconCloudStorm } from "@tabler/icons";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useEffect, useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import type { FC } from "react";
import { AvantIcon } from "src/components/SVG";
import { HEADER_HEIGHT } from "src/libs/const";
import { storage } from "src/libs/firebase/front";
import { RenderInfo } from "src/libs/firebase/server";
import { RenderProgressType } from "src/pages/api/progress";
import { FirstPageState, selectAllFirstPageData } from "src/store/features/firstPageSlice";

/** @package */
export const Header: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [renderInfo, setRenderInfo] = useState<RenderInfo>();
  const [renderStatus, setRenderStatus] = useState<RenderProgressType>();
  const firstPageData = useSelector(selectAllFirstPageData);
  const { title, imageUrl } = firstPageData;

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
    const res = await fetch(imageUrl);
    const blob = await res.blob();
    const storageRed = ref(storage, "images");
    const uploadTask = uploadBytesResumable(storageRed, blob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (err) => console.log(err)
    );
    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
    console.log({ downloadUrl });

    const formData: FirstPageState = {
      title,
      imageUrl: downloadUrl,
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
    <MantineHeader height={HEADER_HEIGHT}>
      <Group position="apart" py={5} px={16} sx={{ display: "flex", justifyItems: "center" }}>
        <AvantIcon />
        <Group>
          {renderStatus?.type === "success" && (
            <NextLink href={renderStatus.url} target="_blank">
              <Text sx={{ fontWeight: "bold" }}>🎉</Text>
            </NextLink>
          )}
          <Stack spacing={3}>
            <Button
              type="button"
              leftIcon={<IconCloudStorm size={18} />}
              loading={isLoading}
              radius="xl"
              sx={{ height: 36 }}
              onClick={handleSubmit}
            >
              {isLoading ? "書き出し中" : "Render"}
            </Button>
            <Progress value={renderStatus?.percent ? renderStatus?.percent * 100 : 0} />
          </Stack>
        </Group>
      </Group>
    </MantineHeader>
  );
};
