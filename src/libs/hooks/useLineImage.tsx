import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateImage } from "../store/features/template1Slice";

type RealtimePayloadType = {
  schema: string;
  table: string;
  commit_timestamp: string;
  eventType: "INSERT";
  new: { id: number; image_url: string; create_at: string };
  old: unknown;
  errors: Error;
};

export const useLineImage = () => {
  const supabase = useSupabaseClient();
  const dispatch = useDispatch();
  useEffect(() => {
    const channel = supabase
      .channel("db-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "line_images" },
        (payload: RealtimePayloadType) => {
          dispatch(updateImage({ scene_number: 1, id: 1, image_url: payload.new.image_url }));
        }
      );

    channel.subscribe();

    const unsubscribe = async () => {
      await supabase.removeChannel(channel);
    };

    return () => {
      unsubscribe().catch((err) => {
        if (err instanceof Error) {
          throw new Error("Something went wrong in Line app");
        }
      });
    };
  }, [dispatch, supabase]);
};
