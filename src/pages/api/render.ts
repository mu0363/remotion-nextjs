// FIXME:
/* eslint-disable no-console */
import { getFunctions, renderMediaOnLambda } from "@remotion/lambda/client";
import { v4 as uuidv4 } from "uuid";
import { REGION, SITE_ID } from "src/libs/const";
import { WATERMARK_EMPTY } from "src/libs/const/remotion-config";
import type { NextApiRequest, NextApiResponse } from "next";
import type { RenderInfo, Template1Type } from "src/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;

  try {
    // FIXME: アサーション削除
    const data = req.body as string;
    const templateData = JSON.parse(data) as Template1Type;

    const [first] = await getFunctions({
      compatibleOnly: true,
      region: REGION,
    });

    const { renderId, bucketName } = await renderMediaOnLambda({
      region: REGION,
      functionName: first.functionName,
      serveUrl: SITE_ID,
      composition: templateData.composition,
      inputProps: { ...templateData, watermark: WATERMARK_EMPTY },
      codec: "h264",
      imageFormat: "jpeg",
      maxRetries: 1,
      framesPerLambda: 80,
      privacy: "public",
    });
    const currentTime = new Date();
    const id = uuidv4();
    const newInfo: RenderInfo = {
      id,
      renderId,
      bucketName,
      functionName: first.functionName,
      region: REGION,
      createdAt: currentTime.toISOString(),
    };

    res.status(200).json(newInfo);
  } catch (error) {
    console.log(error);
  }
}
