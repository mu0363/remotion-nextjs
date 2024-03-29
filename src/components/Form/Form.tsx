// FIXME:
/* eslint-disable no-console */
import { Badge, Stack, Textarea, Tooltip } from "@mantine/core";
// import { Modal } from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { IconCamera } from "@tabler/icons";
import { format } from "date-fns";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { activeSceneAtom, selectedTemplateAtom } from "src/libs/atom/atom";
import { storageUrl, USER_ID } from "src/libs/const/remotion-config";
import { useCurrentData } from "src/libs/hooks/useCurrentData";
import { updateImage, updateT1Text } from "src/libs/store/features/template1Slice";
import { updateT2Text } from "src/libs/store/features/template2Slice";
// import { VideoTrimerFixDuration } from "../VideoTrimer";
import type { Database } from "src/types/database.types";

type ImageType = Database["public"]["Tables"]["images"]["Row"];

/** @package */
export const Form = () => {
  const supabase = useSupabaseClient<Database>();
  // const [isOpened, setIsOpened] = useState<boolean>(false);
  const dispatch = useDispatch();
  const selectedTemplate = useAtomValue(selectedTemplateAtom);
  const { scene_number } = useAtomValue(activeSceneAtom);
  const currentData = useCurrentData(scene_number);
  const { id, template_number, image_number, text, image_url } = currentData;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    switch (selectedTemplate) {
      case "template01":
        dispatch(updateT1Text({ scene_number, id: scene_number, text: e.target.value }));
        break;
      case "template02":
        dispatch(updateT2Text({ scene_number, id: scene_number, text: e.target.value }));
        break;
      default:
        dispatch(updateT1Text({ scene_number, id: scene_number, text: e.target.value }));
    }
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const filename = `T${template_number}_S${scene_number}_${format(new Date(), "yyyyMMddhhmmss")}`;
    const objectUrl = window.URL.createObjectURL(file);
    dispatch(updateImage({ scene_number, id: scene_number, image_url: objectUrl }));
    (async () => {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`${format(new Date(), "yyMMdd")}/${USER_ID}/${filename}`, file);
      if (error) {
        throw new Error("something went wrong");
      }
      await supabase.from("images").insert<Omit<ImageType, "id" | "created_at">>([
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
    <div>
      <Stack>
        <Badge color="cyan" className="w-20">{`シーン${id}`}</Badge>
        <Textarea onChange={handleChange} size="lg" value={text} />
        {image_url !== undefined && (
          <Tooltip label="画像を変更" color="blue" withArrow>
            <div className="flex items-center justify-center">
              <label className="inline-block cursor-pointer">
                <div className="relative h-16 w-32">
                  <IconCamera className="absolute top-0 left-0 z-10 h-16 w-32 rounded-xl p-3 text-gray-500 opacity-0 transition duration-200 ease-in-out hover:bg-gray-200 hover:opacity-70" />
                  <Image
                    width={160}
                    height={80}
                    src={image_url}
                    objectFit="cover"
                    alt="current-image"
                    className="rounded-xl"
                  />
                </div>
                <input type="file" name="avatar-upload" accept="image/*" className="hidden" onChange={handleImage} />
              </label>
            </div>
          </Tooltip>
        )}
        {/* <Modal opened={isOpened} onClose={() => setIsOpened(false)} size="xl" title="Introduce yourself!">
          <VideoTrimerFixDuration />
        </Modal> */}
        {/* <button onClick={() => setIsOpened(true)}>Trim</button> */}
      </Stack>
    </div>
  );
};
