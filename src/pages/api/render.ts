// FIXME: delete console.log
/* eslint-disable no-console */
import { getFunctions, renderMediaOnLambda } from "@remotion/lambda";
import { NextApiRequest, NextApiResponse } from "next";
import { REGION, COMP_NAME, SITE_ID } from "src/libs/const";
import { adminDB, RenderInfo, renderInfoConverter } from "src/libs/firebase/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // FIXME: アサーション削除
    const data = req.body as string;
    const texts = JSON.parse(data) as { firstText: string };

    const [first] = await getFunctions({
      compatibleOnly: true,
      region: REGION,
    });

    const { renderId, bucketName } = await renderMediaOnLambda({
      region: REGION,
      functionName: first.functionName,
      serveUrl: SITE_ID,
      composition: COMP_NAME,
      inputProps: { firstText: texts.firstText },
      codec: "h264",
      imageFormat: "jpeg",
      maxRetries: 1,
      framesPerLambda: 80,
      privacy: "public",
    });

    const docRef = adminDB
      .collection(process.env.FIREBASE_COLLECTION_NAME as string)
      .withConverter(renderInfoConverter)
      .doc();
    const currentTime = new Date();
    const newInfo: RenderInfo = {
      id: docRef.id,
      renderId,
      bucketName,
      functionName: first.functionName,
      region: REGION,
      createdAt: currentTime.toISOString(),
    };
    await docRef.set(newInfo);

    res.status(200).json(newInfo);
  } catch (error) {
    console.log(error);
  }
}
