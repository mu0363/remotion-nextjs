// FIXME:
/* eslint-disable no-console */
import { Badge, Stack, Textarea } from "@mantine/core";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageDropzone } from "../ImageDropzone";
import { storageUrl, USER_ID } from "src/libs/const/remotion-config";
import { useCurrentData } from "src/libs/hooks/useCurrentData";
import { supabaseClient } from "src/libs/supabase/supabaseClient";
import { selectAllActiveScene } from "src/store/features/activeSceneSlice";
import { updateImage, updateText } from "src/store/features/template1Slice";
import { ImageType } from "types";

/** @package */
export const Form = () => {
  const dispatch = useDispatch();
  const activeSceneData = useSelector(selectAllActiveScene);
  const { scene_number } = activeSceneData;
  const currentData = useCurrentData(scene_number);
  const { id, template_number, image_number, text } = currentData;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateText({ scene_number, id: scene_number, text: e.target.value }));
  };

  const handleImage = (files: File[] | null) => {
    if (!files) return;
    const filename = files[0].name;
    const objectUrl = window.URL.createObjectURL(files[0]);
    dispatch(updateImage({ scene_number, id: scene_number, image_url: objectUrl }));
    (async () => {
      const { data, error } = await supabaseClient.storage.from("images").upload(`${USER_ID}/${filename}`, files[0]);
      if (error) {
        throw new Error("something went wrong");
      }
      await supabaseClient.from("images").insert<Omit<ImageType, "id" | "created_at">>([
        {
          user_id: USER_ID,
          template_number,
          scene_number,
          image_number,
          image_url: `${storageUrl}/images/${data.path}`,
        },
      ]);
      dispatch(updateImage({ scene_number, id: scene_number, image_url: `${storageUrl}/images/${data.path}` }));
    })().catch((err) => console.log(err));
  };

  return (
    <Stack>
      <Badge>{`シーン${id}`}</Badge>
      <Textarea onChange={handleChange} size="lg" value={text} />
      <ImageDropzone handleImage={handleImage} />
    </Stack>
  );
};
