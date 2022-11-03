import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import type { ImageType } from "types";

export const useImageQuery = () => {
  const supabase = useSupabaseClient();
  const getImages = async (): Promise<ImageType[]> => {
    const { data, error } = await supabase.from("images").select<"*", ImageType>("*");
    if (error) throw new Error(error.message);
    return data;
  };

  return useQuery<ImageType[], Error>(["images"], getImages);
};
