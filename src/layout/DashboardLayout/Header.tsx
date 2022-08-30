// FIXME:
/* eslint-disable no-console */
import { Burger, Container, createStyles, Group, Header as MantineHeader, MediaQuery } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useEffect, useState, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { FC } from "react";
import { AvantIcon } from "src/components/SVG";
import { HEADER_HEIGHT } from "src/libs/const";
import { storage } from "src/libs/firebase/front";
import { RenderInfo } from "src/libs/firebase/server";
import { RenderProgressType } from "src/pages/api/progress";
import { selectAllTemplate1Data, updateImage } from "src/store/features/template1Slice";

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
  const [isOpened, { toggle }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);
  const [renderInfo, setRenderInfo] = useState<RenderInfo>();
  const [renderStatus, setRenderStatus] = useState<RenderProgressType>();
  const dispatch = useDispatch();
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
      console.log(template1Data);
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
    await Promise.all(
      template1Data.map(async (data) => {
        const res = await fetch(data.image_url);
        const blob = await res.blob();
        const storageRed = ref(storage, `/images/image-${data.id}`);
        const uploadTask = uploadBytesResumable(storageRed, blob);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          },
          (err) => console.log(err)
        );
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        dispatch(updateImage({ scene_number: data.scene_number, id: data.id, image_url: downloadUrl }));
        console.log(downloadUrl);
        return downloadUrl;
      })
    );

    console.log(template1Data);
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
    <MantineHeader height={HEADER_HEIGHT}>
      <Container className={classes.inner} fluid>
        <Group>
          <MediaQuery largerThan="md" styles={{ display: "none" }}>
            <Burger opened={isOpened} onClick={toggle} size="sm" />
          </MediaQuery>
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <AvantIcon />
          </MediaQuery>
        </Group>
      </Container>
    </MantineHeader>
  );
};
