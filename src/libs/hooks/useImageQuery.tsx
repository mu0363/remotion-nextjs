import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../supabase/supabaseClient";
import type { ImageType } from "types";

export const useImageQuery = () => {
  const getImages = async (): Promise<ImageType[]> => {
    const { data, error } = await supabaseClient.from("images").select<"*", ImageType>("*");
    if (error) throw new Error(error.message);
    return data;
  };

  return useQuery<ImageType[], Error>(["images"], getImages);
};
