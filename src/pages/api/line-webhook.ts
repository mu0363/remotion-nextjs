import { TextEventMessage, WebhookRequestBody } from "@line/bot-sdk";
import { Middleware } from "@line/bot-sdk/lib/middleware";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import * as line from "src/libs/line";

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
