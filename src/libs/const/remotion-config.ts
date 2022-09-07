import type { Template1Type, TimelineSceneType } from "types";

export const COMP_NAME = "MyComp";
export const SITE_ID = "https://remotionlambda-47aic418sn.s3.us-east-1.amazonaws.com/sites/j16b05o8oq/index.html";
export const REGION = "us-east-1";
export const TEMPLATE1_DURATION = 360;
export const storageUrl = "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public";
export const WATERMARK = "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/images/watermark.png";
export const WATERMARK_EMPTY =
  "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/images/watermark_empty.png";
export const USER_ID = "22DFD4AE-6E10-491F-81BE-8D9C66CCDDB0";
export const defaultProps: Template1Type = {
  music: "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/music/music1.mp3",
  watermark: WATERMARK,
  sceneState: [
    {
      id: 1,
      template_number: 1,
      scene_number: 1,
      image_number: 1,
      image_url: `${storageUrl}/images/image-01.jpg`,
      text: "素敵な友人に\n恵まれた大学時代",
    },
    {
      id: 2,
      template_number: 1,
      scene_number: 2,
      image_number: 1,
      image_url: `${storageUrl}/images/image-02.jpg`,
      text: "いつでもどこでも\n二人は一緒でした",
    },
    {
      id: 3,
      template_number: 1,
      scene_number: 3,
      image_number: 1,
      image_url: `${storageUrl}/images/image-03.jpg`,
      text: "楽しかったみんなとの旅行\nまた一緒に行こうね",
    },
  ],
};

export const timelineScenes: TimelineSceneType[] = [
  {
    id: 1,
    time: 3,
    thumbnail: `${storageUrl}/images/thumbnail/T1S1_thumbnail.webp`,
  },
  {
    id: 2,
    time: 4,
    thumbnail: `${storageUrl}/images/thumbnail/T1S2_thumbnail.webp`,
  },
  {
    id: 3,
    time: 3,
    thumbnail: `${storageUrl}/images/thumbnail/T1S3_thumbnail.webp`,
  },
];

export const thumbnailStartFrame = [
  { id: 1, from: 0 + 60 },
  { id: 2, from: 120 + 60 },
  { id: 3, from: 240 + 60 },
];
