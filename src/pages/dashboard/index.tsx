import { Grid } from "@mantine/core";
import { DashboardCard } from "src/components/DashboardCard";
import { DashboardLayout } from "src/layout/DashboardLayout";
import { dashboardThumbnailData } from "src/libs/const";
import type { NextPage } from "next";

const Dashboard: NextPage = () => {
  return (
    <DashboardLayout>
      <Grid p={32}>
        {dashboardThumbnailData.map((data) => (
          <DashboardCard key={data.id} dashboardThumbnail={data} />
        ))}
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;
