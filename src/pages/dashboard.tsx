import { Grid } from "@mantine/core";
import { DashboardCard } from "src/components/DashboardCard";
import { DashboardLayout } from "src/layout/DashboardLayout";
import { dashboardThumbnailData } from "src/libs/const";
import type { CustomNextPage } from "next";

const Dashboard: CustomNextPage = () => {
  return (
    <Grid p={32}>
      {dashboardThumbnailData.map((data) => (
        <DashboardCard key={data.id} dashboardThumbnail={data} />
      ))}
    </Grid>
  );
};

Dashboard.getLayout = DashboardLayout;

export default Dashboard;
