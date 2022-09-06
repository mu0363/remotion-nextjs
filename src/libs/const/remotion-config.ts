import type { Template1Type, TimelineSceneType } from "types";

export const COMP_NAME = "MyComp";
export const SITE_ID = "https://remotionlambda-47aic418sn.s3.us-east-1.amazonaws.com/sites/lfg0hra1ip/index.html";
export const REGION = "us-east-1";
export const TEMPLATE1_DURATION = 360;
export const storageUrl = "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public";
export const USER_ID = "22DFD4AE-6E10-491F-81BE-8D9C66CCDDB0";
export const defaultProps: Template1Type = {
  music: "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/images/music1.mp3",
  sceneState: [
    {
      id: 1,
      template_number: 1,
      scene_number: 1,
      image_number: 1,
      image_url: `${storageUrl}/images/girl.png`,
      text: "最初の文字です",
    },
    {
      id: 2,
      template_number: 1,
      scene_number: 2,
      image_number: 1,
      image_url: `${storageUrl}/images/sena_robot.webp`,
      text: "2番目の文字です",
    },
    {
      id: 3,
      template_number: 1,
      scene_number: 3,
      image_number: 1,
      image_url: `${storageUrl}/images/the_cat.png`,
      text: "最後の文字です。\n改行もできます",
    },
  ],
};

export const timelineScenes: TimelineSceneType[] = [
  {
    id: 1,
    time: 3,
    thumbnail: `${storageUrl}/thumbnail/T1S1_thumbnail.webp`,
  },
  {
    id: 2,
    time: 4,
    thumbnail: `${storageUrl}/thumbnail/T1S2_thumbnail.webp`,
  },
  {
    id: 3,
    time: 3,
    thumbnail: `${storageUrl}/thumbnail/T1S3_thumbnail.webp`,
  },
];

export const thumbnailStartFrame = [
  { id: 1, from: 0 + 60 },
  { id: 2, from: 120 + 60 },
  { id: 3, from: 240 + 60 },
];
