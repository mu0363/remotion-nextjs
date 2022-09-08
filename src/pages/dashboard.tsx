import { Grid } from "@mantine/core";
import { CustomNextPage } from "next";
import { DashboardCard } from "src/components/DashboardCard";
import { DashboardLayout } from "src/layout/DashboardLayout";

const dashboardData = [
  { selectedTemplate: "template01" as const, image: "https://source.unsplash.com/random/200x200" },
  { selectedTemplate: "template02" as const, image: "https://source.unsplash.com/random/200x200" },
];

const Dashboard: CustomNextPage = () => {
  return (
    <Grid p={32}>
      {dashboardData.map((data) => (
        <DashboardCard key={data.selectedTemplate} selectedTemplate={data.selectedTemplate} />
      ))}
    </Grid>
  );
};

Dashboard.getLayout = DashboardLayout;

export default Dashboard;
