declare namespace NodeJS {
  type ProcessEnv = {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly REMOTION_AWS_ACCESS_KEY_ID: string;
    readonly REMOTION_AWS_SECRET_ACCESS_KEY: string;
  };
}
