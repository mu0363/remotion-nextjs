import { Card, Grid, Group, Image, Text } from "@mantine/core";
import { useRouter } from "next/router";
import type { FC } from "react";
import type { DashboardThumbnailType } from "types";

/** @package */
export const DashboardCard: FC<{ dashboardThumbnail: DashboardThumbnailType }> = ({ dashboardThumbnail }) => {
  const router = useRouter();
  const { image, selectedTemplate, title, description } = dashboardThumbnail;

  return (
    <Grid.Col md={4} lg={3}>
      <Card radius="lg" shadow="sm" withBorder>
        <Card.Section
          className="cursor-pointer"
          onClick={() => router.push({ pathname: "/player", query: { template: selectedTemplate } })}
        >
          <Image src={image} alt="template" />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500} lineClamp={1}>
            {title}
          </Text>
        </Group>

        <Text size="sm" color="dimmed" lineClamp={1}>
          {description}
        </Text>
      </Card>
    </Grid.Col>
  );
};
