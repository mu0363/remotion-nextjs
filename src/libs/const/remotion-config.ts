import { TimelineSceneType } from "types";

export const COMP_NAME = "MyComp";
export const SITE_ID = "https://remotionlambda-47aic418sn.s3.us-east-1.amazonaws.com/sites/lyks6uk80y/index.html";
export const REGION = "us-east-1";
export const TEMPLATE1_DURATION = 360;
export const defaultProps = [
  {
    page: 1,
    id: 1,
    text: "最初の文字です",
    image: "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/images/girl.png",
  },
  {
    page: 1,
    id: 2,
    text: "2番目の文字です",
    image: "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/images/sena_robot.webp",
  },
  {
    page: 1,
    id: 3,
    text: "最後の文字です。\n改行もできます",
    image: "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/images/the_cat.png",
  },
];

export const timelineScenes: TimelineSceneType[] = [
  {
    id: 1,
    time: 3,
    thumbnail: "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/thumbnail/T1S1_thumbnail.webp",
  },
  {
    id: 2,
    time: 4,
    thumbnail: "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/thumbnail/T1S2_thumbnail.webp",
  },
  {
    id: 3,
    time: 3,
    thumbnail: "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/thumbnail/T1S3_thumbnail.webp",
  },
];
