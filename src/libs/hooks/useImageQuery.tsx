import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import type { Database } from "src/types/database.types";

type ImageType = Database["public"]["Tables"]["images"]["Row"];

export const useImageQuery = () => {
  const supabase = useSupabaseClient();
  const getImages = async (): Promise<ImageType[]> => {
    const { data, error } = await supabase.from("images").select<"*", ImageType>("*");
    if (error) throw new Error(error.message);
    return data;
  };

  return useQuery<ImageType[], Error>(["images"], getImages);
};
