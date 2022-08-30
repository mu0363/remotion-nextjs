// FIXME:
/* eslint-disable no-console */
import { Tooltip, Card, Image } from "@mantine/core";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thumbnailStartFrame } from "src/libs/const";
import { selectAllCurrentPage, updateCurrentPage } from "src/store/features/currentPageSlice";
import { TimelineSceneType } from "types";

type Props = {
  scene: TimelineSceneType;
};

export const TimelineCard: FC<Props> = ({ scene }) => {
  const { id, thumbnail } = scene;
  const dispatch = useDispatch();
  const currentPageData = useSelector(selectAllCurrentPage);
  const { template, page } = currentPageData;

  const handleClick = () => {
    // FIXME: findの方がよい?
    const startFrame = thumbnailStartFrame.find((data) => data.id === id);
    if (startFrame) {
      dispatch(updateCurrentPage({ template, page, id, from: startFrame.from }));
    }
  };

  return (
    <div className="cursor-pointer">
      <Tooltip label={`シーン${id}`} color="#1f2428" withArrow transition="fade" transitionDuration={300}>
        <Card
          shadow="sm"
          p="lg"
          mr={10}
          mt={32}
          mb={20}
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
