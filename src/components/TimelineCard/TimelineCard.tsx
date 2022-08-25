// FIXME:
/* eslint-disable no-console */
import { Tooltip, Card, Image } from "@mantine/core";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCurrentPage, updateCurrentPage } from "src/store/features/currentPageSlice";

const frameCollection = [
  { id: 1, from: 0 + 60 },
  { id: 2, from: 120 + 60 },
  { id: 3, from: 240 + 60 },
];

export const TimelineCard: FC<{ currentId: number }> = ({ currentId }) => {
  const dispatch = useDispatch();
  const currentPageData = useSelector(selectAllCurrentPage);
  const { template, page } = currentPageData;

  const handleClick = () => {
    // FIXME: findの方がよい?
    const startFrame = frameCollection.find((data) => data.id === currentId);
    if (startFrame) {
      dispatch(updateCurrentPage({ template, page, id: currentId, from: startFrame.from }));
    }
  };

  return (
    <Tooltip label={`シーン${currentId}`} color="#1f2428" withArrow transition="fade" transitionDuration={300}>
      <Card
        shadow="sm"
        p="lg"
        mr={10}
        radius="md"
        sx={{
          width: 130,
          flexShrink: 0,
        }}
        onClick={handleClick}
      >
        <Card.Section>
          <Image src="https://source.unsplash.com/random" height={64} alt="Norway" />
        </Card.Section>
      </Card>
    </Tooltip>
  );
};
