import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { SnapshotOptions } from "./../../../node_modules/@firebase/firestore-compat/dist/node-esm/src/api/database.d";
import type { QueryDocumentSnapshot } from "firebase-admin/firestore";

// Firebase admin initialize
if (!getApps()?.length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    storageBucket: process.env.FIREBASE_BUCKET_NAME,
  });
}
export const adminDB = getFirestore();
export const adminBucket = getStorage().bucket();

// Firebase withConverter
export type RenderInfo = {
  id: string;
  renderId: string;
  bucketName: string;
  functionName: string;
  region:
    | "eu-central-1"
    | "eu-west-1"
    | "eu-west-2"
    | "us-east-1"
    | "us-east-2"
    | "us-west-2"
    | "ap-south-1"
    | "ap-southeast-1"
    | "ap-southeast-2"
    | "ap-northeast-1";
  createdAt: string;
};

export const renderInfoConverter = {
  toFirestore: (renderInfo: RenderInfo) => {
    return renderInfo;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<RenderInfo>, _options?: SnapshotOptions) => {
    const data = snapshot.data();
    return data;
  },
};
