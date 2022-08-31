// FIXME:
/* eslint-disable no-console */
import { Tooltip, Card, Image } from "@mantine/core";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thumbnailStartFrame } from "src/libs/const";
import { selectAllActiveScene, updateActiveScene } from "src/libs/store/features/activeSceneSlice";
import { TimelineSceneType } from "types";

type Props = {
  card: TimelineSceneType;
};

export const TimelineCard: FC<Props> = ({ card }) => {
  const { id, thumbnail } = card;
  const dispatch = useDispatch();
  const activeSceneData = useSelector(selectAllActiveScene);
  const { template_number } = activeSceneData;

  const handleClick = () => {
    const startFrame = thumbnailStartFrame.find((data) => data.id === id);
    if (startFrame) {
      dispatch(updateActiveScene({ template_number, scene_number: id, from: startFrame.from }));
    }
  };

  return (
    <div className="cursor-pointer">
      <Tooltip label={`シーン${id}`} color="#1f2428" withArrow transition="fade" transitionDuration={300}>
        <Card
          shadow="sm"
          p="lg"
          mr={10}
          mt={16}
          mb={16}
          radius="md"
          sx={{
            width: 130,
            flexShrink: 0,
          }}
          onClick={handleClick}
        >
          <Card.Section>
            <Image src={thumbnail} height={64} alt="scene-thumbnail" />
          </Card.Section>
        </Card>
      </Tooltip>
    </div>
  );
};
