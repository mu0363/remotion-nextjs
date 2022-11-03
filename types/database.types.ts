export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      images: {
        Row: {
          id: number
          template_number: number
          scene_number: number
          image_number: number
          image_url: string
          created_at: string
          user_id: string
        }
        Insert: {
          id?: number
          template_number: number
          scene_number: number
          image_number: number
          image_url: string
          created_at?: string
          user_id?: string
        }
        Update: {
          id?: number
          template_number?: number
          scene_number?: number
          image_number?: number
          image_url?: string
          created_at?: string
          user_id?: string
        }
      }
      liff_info: {
        Row: {
          id: number
          created_at: string
          image_url: string
          text: string
          template_number: number
          user_id: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          image_url: string
          text: string
          template_number: number
          user_id?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          image_url?: string
          text?: string
          template_number?: number
          user_id?: string | null
        }
      }
      line_images: {
        Row: {
          id: number
          created_at: string
          image_url: string
        }
        Insert: {
          id?: number
          created_at?: string
          image_url: string
        }
        Update: {
          id?: number
          created_at?: string
          image_url?: string
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
