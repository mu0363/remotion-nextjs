import { Grid } from "@mantine/core";
import { CustomNextPage } from "next";
import { DashboardCard } from "src/components/DashboardCard";
import { DashboardLayout } from "src/layout/DashboardLayout";

const dashboardData = [
  { template: 1, image: "https://source.unsplash.com/random/200x200" },
  { template: 2, image: "https://source.unsplash.com/random/200x200" },
  { template: 3, image: "https://source.unsplash.com/random/200x200" },
  { template: 4, image: "https://source.unsplash.com/random/200x200" },
  { template: 5, image: "https://source.unsplash.com/random/200x200" },
  { template: 6, image: "https://source.unsplash.com/random/200x200" },
  { template: 7, image: "https://source.unsplash.com/random/200x200" },
  { template: 8, image: "https://source.unsplash.com/random/200x200" },
  { template: 9, image: "https://source.unsplash.com/random/200x200" },
  { template: 10, image: "https://source.unsplash.com/random/200x200" },
  { template: 11, image: "https://source.unsplash.com/random/200x200" },
  { template: 12, image: "https://source.unsplash.com/random/200x200" },
  { template: 13, image: "https://source.unsplash.com/random/200x200" },
  { template: 14, image: "https://source.unsplash.com/random/200x200" },
  { template: 15, image: "https://source.unsplash.com/random/200x200" },
  { template: 16, image: "https://source.unsplash.com/random/200x200" },
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
