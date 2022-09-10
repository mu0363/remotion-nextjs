import { ClientConfig, Client, middleware as lineMiddleware, MiddlewareConfig } from "@line/bot-sdk";

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET || "",
};

/** @package */
export const client = new Client(clientConfig);
export const middleware = lineMiddleware(middlewareConfig);

// const client = new Client(clientConfig);
// const handleEvent = (event: line.WebhookEvent) => {
//   if (event.type !== "message" || event.message.type !== "text") {
//     return Promise.resolve(null);
//   }
//   return client.replyMessage(event.replyToken, {
//     type: "text",
//     text: event.message.text,
//   });
// };

// line.middleware(config);
