// FIXME:
/* eslint-disable no-console */
import { Center, Stack, Text, TextInput } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageDropzone } from "../ImageDropzone";
import { RenderProgressType } from "src/pages/api/progress";
import { selectAllCurrentPage } from "src/store/features/currentPageSlice";
import { selectAllTemplate1Data, updateImage, updateText } from "src/store/features/template1Slice";

/** @package */
export const Form = () => {
  const [renderStatus, setRenderStatus] = useState<RenderProgressType>();
  const dispatch = useDispatch();
  const template1Data = useSelector(selectAllTemplate1Data);
  const currentPageData = useSelector(selectAllCurrentPage);
  const { page, id } = currentPageData;
  const pageContents = template1Data.filter((data) => data.page === page);
  // TODO: findの方が良い?
  const content = pageContents.filter((pageContent) => pageContent.id === id);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateText({ page, id, text: e.target.value }));
  };

  const handleImage = (files: File[] | null) => {
    if (!files) return;
    const objectUrl = window.URL.createObjectURL(files[0]);
    dispatch(updateImage({ page, id, image: objectUrl }));
  };

  return (
    <Stack>
      <TextInput onChange={handleChange} size="lg" value={content[0].text} />
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
