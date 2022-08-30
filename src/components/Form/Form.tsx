// FIXME:
/* eslint-disable no-console */
import { Badge, Stack, Textarea } from "@mantine/core";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageDropzone } from "../ImageDropzone";
import { selectAllCurrentPage } from "src/store/features/currentPageSlice";
import { selectAllTemplate1Data, updateImage, updateText } from "src/store/features/template1Slice";

/** @package */
export const Form = () => {
  const dispatch = useDispatch();
  const template1Data = useSelector(selectAllTemplate1Data);
  const currentPageData = useSelector(selectAllCurrentPage);
  const { page, id } = currentPageData;
  const pageContents = template1Data.filter((data) => data.page === page);
  const content = pageContents.filter((pageContent) => pageContent.id === id);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateText({ page, id, text: e.target.value }));
  };

  const handleImage = (files: File[] | null) => {
    if (!files) return;
    console.log(files[0]);

    const objectUrl = window.URL.createObjectURL(files[0]);
    dispatch(updateImage({ page, id, image: objectUrl }));
    // supabaseClient.storage.from("images").upload("")
  };

  return (
    <Stack>
      <Badge>{`シーン${content[0].id}`}</Badge>
      <Textarea onChange={handleChange} size="lg" value={content[0].text} />
      <ImageDropzone handleImage={handleImage} />
    </Stack>
  );
};
