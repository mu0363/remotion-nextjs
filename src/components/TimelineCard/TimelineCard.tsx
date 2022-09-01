// FIXME:
/* eslint-disable no-console */
import { Tooltip } from "@mantine/core";
import { PlayerRef } from "@remotion/player";
import { useAtom, useSetAtom } from "jotai";
import Image from "next/image";
import { FC, RefObject } from "react";
import { activeSceneAtom, isPlayingAtom } from "src/libs/atom/atom";
import { thumbnailStartFrame } from "src/libs/const";
import { TimelineSceneType } from "types";

type Props = {
  card: TimelineSceneType;
  playerRef: RefObject<PlayerRef>;
};

export const TimelineCard: FC<Props> = ({ card, playerRef }) => {
  const { id, thumbnail } = card;
  const setIsPlaying = useSetAtom(isPlayingAtom);
  const [activeSceneData, setActiveSceneData] = useAtom(activeSceneAtom);

  const handleClick = () => {
    const startFrame = thumbnailStartFrame.find((data) => data.id === id);
    if (playerRef.current && startFrame) {
      setIsPlaying(false);
      playerRef.current.pause();
      setActiveSceneData((prev) => {
        return { template_number: 1, scene_number: id, from: startFrame.from, toggle: !prev.toggle };
      });
    }
  };

  return (
    <Tooltip label={`シーン${id}`} color="#1f2428" withArrow transition="fade" transitionDuration={300}>
      <div
        className={`my-3 mr-2 h-16 w-28 cursor-pointer rounded-2xl ${
          activeSceneData.scene_number === id ? "border border-solid border-red-500" : "border"
        } `}
      >
        <Image
          src={thumbnail}
          width={213}
          height={120}
          objectFit="cover"
          className="rounded-2xl"
          alt="scene-thumbnail"
          onClick={handleClick}
        />
      </div>
    </Tooltip>
  );
};
