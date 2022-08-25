// FIXME:
/* eslint-disable no-console */
import { Tooltip, Card, Image } from "@mantine/core";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCurrentPage, updateCurrentPage } from "src/store/features/currentPageSlice";
import { selectAllTemplate1Data } from "src/store/features/template1Slice";

const frameCollection = [
  { id: 1, from: 0 + 60 },
  { id: 2, from: 120 + 60 },
  { id: 3, from: 240 + 60 },
];

export const TimelineCard: FC<{ currentId: number }> = ({ currentId }) => {
  const dispatch = useDispatch();
  const template1Data = useSelector(selectAllTemplate1Data);
  const currentPageData = useSelector(selectAllCurrentPage);
  const { template, page } = currentPageData;

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

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
          <Image src={`https://source.unsplash.com/random/320x180`} height={64} alt="Norway" />
        </Card.Section>
      </Card>
    </Tooltip>
  );
};
