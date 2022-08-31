import { Grid } from "@mantine/core";
import { CustomNextPage } from "next";
import { DashboardCard } from "src/components/DashboardCard";
import { DashboardLayout } from "src/layout/DashboardLayout";

const dashboardData = [
  { template: 1, image: "https://source.unsplash.com/random/200x200" },
  { template: 2, image: "https://source.unsplash.com/random/200x200" },
  { template: 3, image: "https://source.unsplash.com/random/200x200" },
  { template: 4, image: "https://source.unsplash.com/random/200x200" },
];

const Dashboard: CustomNextPage = () => {
  return (
    <Grid p={32}>
      {dashboardData.map((data) => (
        <DashboardCard key={data.template} />
      ))}
    </Grid>
  );
};

Dashboard.getLayout = DashboardLayout;

export default Dashboard;
