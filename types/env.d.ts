declare namespace NodeJS {
  interface ProcessEnv  {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly REMOTION_AWS_ACCESS_KEY_ID: string;
    readonly REMOTION_AWS_SECRET_ACCESS_KEY: string;
    readonly FIREBASE_PROJECT_ID: string;
    readonly FIREBASE_PRIVATE_KEY_ID: string;
    readonly FIREBASE_PRIVATE_KEY: string;
    readonly FIREBASE_CLIENT_EMAIL: string;
    readonly FIREBASE_CLIENT_ID: string;
    readonly FIREBASE_CLIENT_X509_CERT_URL: string;
    readonly FIREBASE_COLLECTION_NAME: string;
  };
}
