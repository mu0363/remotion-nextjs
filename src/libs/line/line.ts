import { ClientConfig, Client, middleware as lineMiddleware, MiddlewareConfig } from "@line/bot-sdk";

export const clientConfig: ClientConfig = {
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
