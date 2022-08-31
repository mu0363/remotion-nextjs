// FIXME:
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
import { getFunctions, renderMediaOnLambda } from "@remotion/lambda";
// import { getStorage, ref, uploadBytes } from "firebase/storage";
import { NextApiRequest, NextApiResponse } from "next";
import { REGION, COMP_NAME, SITE_ID } from "src/libs/const";
import { adminDB, RenderInfo, renderInfoConverter } from "src/libs/firebase/server";
import { SceneState } from "src/store/features/template1Slice";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;

  try {
    // FIXME: アサーション削除
    const data = req.body as string;

    const template1Data = JSON.parse(data) as SceneState[];
    console.log(template1Data);

    const [first] = await getFunctions({
      compatibleOnly: true,
      region: REGION,
    });

    const { renderId, bucketName } = await renderMediaOnLambda({
      region: REGION,
      functionName: first.functionName,
      serveUrl: SITE_ID,
      composition: COMP_NAME,
      // inputProps: template1Data,
      inputProps: [
        {
          id: 1,
          template_number: 1,
          scene_number: 1,
          image_number: 1,
          image_url:
            "https://firebasestorage.googleapis.com/v0/b/remotion-render-info.appspot.com/o/images%2Fimage-1?alt=media&token=2a97b8e7-7a70-4f79-af72-7f3e29f77afa",
          text: "最初の文字だよ",
        },
        {
          id: 2,
          template_number: 1,
          scene_number: 2,
          image_number: 1,
          image_url: `https://firebasestorage.googleapis.com/v0/b/remotion-render-info.appspot.com/o/images%2Fimage-1?alt=media&token=2a97b8e7-7a70-4f79-af72-7f3e29f77afa`,
          text: "2番目の文字だよ",
        },
        {
          id: 3,
          template_number: 1,
          scene_number: 3,
          image_number: 1,
          image_url: `https://firebasestorage.googleapis.com/v0/b/remotion-render-info.appspot.com/o/images%2Fimage-1?alt=media&token=2a97b8e7-7a70-4f79-af72-7f3e29f77afa`,
          text: "最後の文字だよい",
        },
      ],
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
