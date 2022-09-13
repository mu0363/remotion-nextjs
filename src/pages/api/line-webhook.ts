import fs from "node:fs/promises";
import { TextEventMessage, WebhookRequestBody } from "@line/bot-sdk";
import { Middleware } from "@line/bot-sdk/lib/middleware";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { storageUrl } from "src/libs/const/remotion-config";
import * as line from "src/libs/line";
import { supabaseAdmin } from "src/libs/supabase/supabaseAdmin";

export const config = {
  api: {
    bodyParser: false, // Necessary for line.middleware
  },
};

const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: Middleware) => {
  return new Promise(async (resolve, reject) => {
    await fn(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
  });
};

export const getMessageContent = (messageId: string): Promise<Buffer> => {
  return new Promise((resolve, reject) =>
    line.client
      .getMessageContent(messageId)
      .then((stream) => {
        const content: Buffer[] = [];
        stream.on("data", (chunk) =>
          content.push(Buffer.from(chunk as WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>))
        );
        stream.on("end", () => resolve(Buffer.concat(content)));
        stream.on("error", (err) => {
          console.error(err);
          reject("lineGetContent");
        });
      })
      .catch((err) => {
        console.error(err);
        reject("lineGetContent");
      })
  );
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      // Validate request
      await runMiddleware(req, res, line.middleware);

      // Handle events
      const body = req.body as WebhookRequestBody;
      await Promise.all(
        body.events.map((event) =>
          (async () => {
            if (event.mode === "active") {
              switch (event.type) {
                case "message": {
                  if (event.message.type === "image") {
                    const filePath = `./src/libs/tmp/${event.message.id}.jpg`;
                    // 画像を取得
                    const buffer = await getMessageContent(event.message.id);
                    // 画像を一時保存
                    await fs.writeFile(filePath, buffer, "binary");
                    const { data, error } = await supabaseAdmin.storage
                      .from("images")
                      .upload(`line/${event.message.id}.jpg`, buffer, { contentType: "image/jpeg" });
                    if (error) {
                      throw new Error("something went wrong");
                    }

                    await supabaseAdmin.from("line_images").insert<{ image_url: string }>([
                      {
                        image_url: `${storageUrl}/images/${data.path}`,
                      },
                    ]);

                    // 一時保存した画像を削除する
                    await fs.unlink(filePath);
                  }
                  const eventMessage = event.message as TextEventMessage;
                  const name = event.source.userId
                    ? (await line.client.getProfile(event.source.userId)).displayName
                    : "User";
                  await line.client.replyMessage(event.replyToken, {
                    type: "text",
                    text: `Hi, ${name}! ${eventMessage.text}`,
                  });
                  break;
                }
                case "follow": {
                  // Do something.
                  break;
                }
              }
            }
          })()
        )
      );
      res.status(200).end();
    } else {
      res.status(405).end();
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ name: e.name, message: e.message });
    } else {
      res.status(500).end();
    }
  }
};

export default handler;
