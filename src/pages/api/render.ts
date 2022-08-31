// FIXME:
/* eslint-disable no-console */
import { getFunctions, renderMediaOnLambda } from "@remotion/lambda";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { REGION, COMP_NAME, SITE_ID } from "src/libs/const";
import { RenderInfo } from "src/libs/firebase/server";
import { SceneState } from "src/store/features/template1Slice";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;

  try {
    // FIXME: アサーション削除
    const data = req.body as string;
    const template1Data = JSON.parse(data) as SceneState[];
    const [first] = await getFunctions({
      compatibleOnly: true,
      region: REGION,
    });

    const { renderId, bucketName } = await renderMediaOnLambda({
      region: REGION,
      functionName: first.functionName,
      serveUrl: SITE_ID,
      composition: COMP_NAME,
      inputProps: template1Data,
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
