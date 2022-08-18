// FIXME:
/* eslint-disable no-console */
import { Button, Stack, TextInput } from "@mantine/core";
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
  const [renderInfo, setRenderInfo] = useState<RenderInfo>();
  const [renderStatus, setRenderStatus] = useState<RenderProgressType>();
  const dispatch = useDispatch();
  const texts = useSelector(selectAllText);

  // 書き出し進捗確認
  const pollProgress = useCallback(async (renderInfo: RenderInfo) => {
    const poll = async () => {
      const progress = await fetch("/api/progress", {
        method: "POST",
        body: JSON.stringify({
          renderInfo,
        }),
      });
      const progressJson = (await progress.json()) as RenderProgressType;
      setRenderStatus(progressJson);

      // if (progressJson.type === "progress") {
      //   console.log("in progress....");
      // }
      // if (progressJson.type !== "success") {
      //   console.log("success!!!!!");
      // }
    };
    const timeout = (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    await timeout(1000);
    await poll();
  }, []);

  useEffect(() => {
    if (renderStatus?.type == "progress" && renderInfo) {
      (async () => {
        await pollProgress(renderInfo);
        console.log(renderStatus);
        console.log(renderInfo);
      })();
    }
    if (renderStatus?.type == "success") {
      console.log("完成！from useEffect");
      console.log(renderStatus);
    }
  }, [renderStatus?.type, pollProgress, renderInfo]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateText({ firstText: e.target.value }));
  };

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const renderInfo = await renderStart();
    await pollProgress(renderInfo);
  };

  return (
    // FIXME:
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput onChange={handleChange} />
        <Button type="submit">Render!!!!!</Button>
      </Stack>
    </form>
  );
};
