// FIXME:
/* eslint-disable no-console */
import { Badge, FileInput, Stack, Textarea } from "@mantine/core";
import { IconUpload } from "@tabler/icons";
import { useAtomValue } from "jotai";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { activeSceneAtom } from "src/libs/atom/atom";
import { storageUrl, USER_ID } from "src/libs/const/remotion-config";
import { useCurrentData } from "src/libs/hooks/useCurrentData";
import { updateImage, updateText } from "src/libs/store/features/template1Slice";
import { supabaseClient } from "src/libs/supabase/supabaseClient";
import { ImageType } from "types";

/** @package */
export const Form = () => {
  const dispatch = useDispatch();
  const { scene_number } = useAtomValue(activeSceneAtom);
  const currentData = useCurrentData(scene_number);
  const { id, template_number, image_number, text } = currentData;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateText({ scene_number, id: scene_number, text: e.target.value }));
  };

  const handleImage = (file: File | null) => {
    if (!file) return;
    const filename = file.name;
    const objectUrl = window.URL.createObjectURL(file);
    dispatch(updateImage({ scene_number, id: scene_number, image_url: objectUrl }));
    (async () => {
      const { data, error } = await supabaseClient.storage.from("images").upload(`${USER_ID}/${filename}`, file);
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
      <Badge className="w-20">{`シーン${id}`}</Badge>
      <Textarea onChange={handleChange} size="lg" value={text} />
      <FileInput label="Your resume" placeholder="Your resume" icon={<IconUpload size={14} />} onChange={handleImage} />
    </Stack>
  );
};
