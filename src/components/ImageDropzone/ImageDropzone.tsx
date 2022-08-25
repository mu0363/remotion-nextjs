// FIXME:
/* eslint-disable no-console */
import { Stack, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons";
import type { FC } from "react";

/** @package */
export const ImageDropzone: FC<{ handleImage: (file: File[]) => void }> = ({ handleImage }) => {
  return (
    <Dropzone
      multiple={false}
      onDrop={handleImage}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
    >
      <Stack align="center" justify="center" style={{ minHeight: 120, pointerEvents: "none" }}>
        <Dropzone.Accept>
          <IconUpload size={50} stroke={1.5} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size={50} stroke={1.5} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size={50} stroke={1.5} />
        </Dropzone.Idle>

        <Text size="sm" color="dimmed" inline mt={7}>
          写真をドラッグ&ドロップ
        </Text>
      </Stack>
    </Dropzone>
  );
};
