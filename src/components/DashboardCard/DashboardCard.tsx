import { Card, Grid, Group, Image, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { FC } from "react";
import { SelectedTemplateType } from "types";

/** @package */
export const DashboardCard: FC<{ selectedTemplate: SelectedTemplateType }> = ({ selectedTemplate }) => {
  const router = useRouter();

  return (
    <Grid.Col md={4} lg={3}>
      <Card radius="lg" shadow="sm" withBorder>
        <Card.Section
          className="cursor-pointer"
          onClick={() => router.push({ pathname: "/player", query: { template: selectedTemplate } })}
        >
          <Image src={`https://source.unsplash.com/random/320x180`} alt="template" />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500} lineClamp={1}>
            Norway Fjord Adventures
          </Text>
        </Group>

        <Text size="sm" color="dimmed" lineClamp={1}>
          With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around
          the fjords of Norway
        </Text>
      </Card>
    </Grid.Col>
  );
};
