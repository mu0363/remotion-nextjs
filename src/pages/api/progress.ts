import { getRenderProgress, RenderProgress } from "@remotion/lambda";
import { RenderInfo } from "./../../libs/firebase/server";
import type { NextApiRequest, NextApiResponse } from "next";

export type RenderProgressType =
  | {
      type: "progress";
      progress: {
        percent: number;
      };
    }
  | {
      type: "success";
      url: string;
    }
  | {
      type: "error";
      errors: string;
    };

const getRenderProgressStatus = (progress: RenderProgress): RenderProgressType => {
  if (progress.outputFile) {
    return {
      type: "success",
      url: progress.outputFile,
    };
  }

  if (progress.fatalErrorEncountered) {
    return {
      type: "error",
      errors: progress.errors[0].stack,
    };
  }

  return {
    type: "progress",
    progress: {
      percent: progress.overallProgress,
    },
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<RenderProgressType>) {
  const body = req.body as string;
  const { renderInfo } = JSON.parse(body) as { renderInfo: RenderInfo };
  const { renderId, bucketName, functionName, region } = renderInfo;

  const progress = await getRenderProgress({
    renderId,
    bucketName,
    functionName,
    region,
  });

  const progressStatus = getRenderProgressStatus(progress);
  res.status(200).json(progressStatus);
}
