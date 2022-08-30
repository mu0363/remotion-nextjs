// FIXME:
/* eslint-disable no-console */
import { Badge, Stack, Textarea } from "@mantine/core";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageDropzone } from "../ImageDropzone";
import { storageUrl, USER_ID } from "src/libs/const/remotion-config";
import { supabaseClient } from "src/libs/supabase/supabaseClient";
import { selectAllEditFrame } from "src/store/features/editFrameSlice";
import { selectAllTemplate1Data, updateImage, updateText } from "src/store/features/template1Slice";
import { ImageType } from "types";

/** @package */
export const Form = () => {
  const dispatch = useDispatch();
  const template1Data = useSelector(selectAllTemplate1Data);
  const editFrameData = useSelector(selectAllEditFrame);
  const { scene_number, id, template_number } = editFrameData;
  const sceneContent = template1Data.filter((data) => data.scene_number === scene_number);
  console.log({ sceneContent });
  // FIXME: いらないかも
  // const content = sceneContent.filter((sceneContent) => sceneContent.id === id);
  // console.log({ content });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateText({ scene_number, id, text: e.target.value }));
  };

  const handleImage = (files: File[] | null) => {
    if (!files) return;
    const filename = files[0].name;
    const objectUrl = window.URL.createObjectURL(files[0]);
    dispatch(updateImage({ scene_number, id, image_url: objectUrl }));
    (async () => {
      const { data, error } = await supabaseClient.storage.from("images").upload(`${USER_ID}/${filename}`, files[0]);
      if (error) {
        throw new Error("something went wrong");
      }
      await supabaseClient.from("images").insert<Omit<ImageType, "id" | "created_at">>([
        {
          user_id: USER_ID,
          template_number,
          scene_number: sceneContent[0].scene_number,
          image_number: 1,
          image_url: `${storageUrl}/images/${data.path}`,
        },
      ]);
      dispatch(updateImage({ scene_number, id, image_url: `${storageUrl}/images/${data.path}` }));
    })().catch((err) => console.log(err));
  };

  return (
    <Stack>
      <Badge>{`シーン${sceneContent[0].id}`}</Badge>
      <Textarea onChange={handleChange} size="lg" value={sceneContent[0].text} />
      <ImageDropzone handleImage={handleImage} />
    </Stack>
  );
};
