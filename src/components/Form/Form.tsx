// FIXME:
/* eslint-disable no-console */
import { Center, Stack, Text, TextInput } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageDropzone } from "../ImageDropzone";
import { RenderProgressType } from "src/pages/api/progress";
import { selectAllFirstPageData, updateImage, updateText } from "src/store/features/firstPageSlice";

/** @package */
export const Form = () => {
  const [renderStatus, setRenderStatus] = useState<RenderProgressType>();
  const dispatch = useDispatch();
  const firstPageData = useSelector(selectAllFirstPageData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateText({ title: e.target.value }));
  };

  const handleImage = (files: File[] | null) => {
    if (!files) return;
    const objectUrl = window.URL.createObjectURL(files[0]);
    dispatch(updateImage({ imageUrl: objectUrl }));
  };

  return (
    <Stack>
      <TextInput onChange={handleChange} size="lg" value={firstPageData.title} />
      <ImageDropzone handleImage={handleImage} />
      <Center>
        {renderStatus?.type === "success" && (
          <NextLink href={renderStatus.url} target="_blank">
            <Text sx={{ fontWeight: "bold" }}>🎉 Ta-da!! Check the video 🎉</Text>
          </NextLink>
        )}
      </Center>
    </Stack>
  );
};
