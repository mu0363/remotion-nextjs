declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly REMOTION_AWS_ACCESS_KEY_ID: string;
    readonly REMOTION_AWS_SECRET_ACCESS_KEY: string;
    readonly NEXT_PUBLIC_SUPABASE_URL: string;
    readonly NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    readonly SUPABASE_SERVICE_ROLE_KEY: string;
    readonly LINE_CHANNEL_ACCESS_TOKEN: string;
    readonly LINE_CHANNEL_SECRET: string;
  }
}
