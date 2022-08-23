import { Tooltip, Card, Image } from "@mantine/core";
import { FC } from "react";

export const TimelineCard: FC<{ id: number }> = ({ id }) => {
  return (
    <Tooltip label={`シーン${id}`} color="#1f2428" withArrow transition="fade" transitionDuration={300}>
      <Card
        shadow="sm"
        p="lg"
        mr={10}
        radius="md"
        withBorder
        sx={{
          width: 130,
          flexShrink: 0,
          borderWidth: 2,
          borderColor: "grey",
        }}
      >
        <Card.Section>
          <Image src="https://source.unsplash.com/random" height={64} alt="Norway" />
        </Card.Section>
      </Card>
    </Tooltip>
  );
};
