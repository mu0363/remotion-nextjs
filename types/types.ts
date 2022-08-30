import type { definitions } from './supabase';

// 自動生成したsupabaseからの取得データ
export type ImageType = definitions['images'];

// タイムラインのサムネイルデータ
export type TimelineSceneType = {
  id: number;
  time: number;
  thumbnail: string;
};
