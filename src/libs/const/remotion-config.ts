import type { Template1Type, MusicState, TemplateTimelineSceneType, Template2Type } from "types";

export const COMP_NAME = "MyComp";
export const SITE_ID = "https://remotionlambda-47aic418sn.s3.us-east-1.amazonaws.com/sites/c7o4e4mmwc/index.html";
export const REGION = "us-east-1";
export const TEMPLATE1_DURATION = 360;
export const storageUrl = "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public";
export const WATERMARK = "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/images/watermark.png";
export const WATERMARK_EMPTY =
  "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/images/watermark_empty.png";
export const USER_ID = "22DFD4AE-6E10-491F-81BE-8D9C66CCDDB0";
export const Template1DefaultProps: Template1Type = {
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

export const Template2DefaultProps: Template2Type = {
  music: "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/music/music2.mp3",
  watermark: WATERMARK,
  sceneState: [
    {
      id: 1,
      template_number: 2,
      scene_number: 1,
      image_number: 1,
      image_url: `${storageUrl}/images/image-01.jpg`,
      text: "Think different.",
    },
    {
      id: 2,
      template_number: 2,
      scene_number: 2,
      image_number: 1,
      image_url: `${storageUrl}/images/image-02.jpg`,
      text: "Just Do It.",
    },
  ],
};

export const timelineScenes: TemplateTimelineSceneType = {
  template01: [
    {
      id: 1,
      time: 3,
      thumbnail: `${storageUrl}/images/thumbnail/thumbnail_T1S1.webp`,
    },
    {
      id: 2,
      time: 4,
      thumbnail: `${storageUrl}/images/thumbnail/thumbnail_T1S2.webp`,
    },
    {
      id: 3,
      time: 3,
      thumbnail: `${storageUrl}/images/thumbnail/thumbnail_T1S3.webp`,
    },
  ],
  template02: [
    {
      id: 1,
      time: 3,
      thumbnail: `${storageUrl}/images/thumbnail/thumbnail_T1S1.webp`,
    },
    {
      id: 2,
      time: 4,
      thumbnail: `${storageUrl}/images/thumbnail/thumbnail_T1S2.webp`,
    },
  ],
};

export const musicList: MusicState[] = [
  {
    id: 1,
    name: "Captured Memories",
    artist: "Marshall Usinger",
    time: "3:30",
    thumbnail: `${storageUrl}/images/thumbnail/thumbnail_music_01.jpeg`,
    music: "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/music/music1.mp3",
    isSelected: true,
  },
  {
    id: 2,
    name: "Sunny Summer",
    artist: "Zach Sorgen",
    time: "1:55",
    thumbnail: `${storageUrl}/images/thumbnail/thumbnail_music_02.jpeg`,
    music: "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/music/music2.mp3",
    isSelected: false,
  },
  {
    id: 3,
    name: "On the Tip of My Toes",
    artist: "Jane & The Boy",
    time: "3:08",
    thumbnail: `${storageUrl}/images/thumbnail/thumbnail_music_04.jpeg`,
    music: "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/music/music3.mp3",
    isSelected: false,
  },
];

export const thumbnailStartFrame = [
  { id: 1, from: 0 + 60 },
  { id: 2, from: 120 + 60 },
  { id: 3, from: 240 + 60 },
];
