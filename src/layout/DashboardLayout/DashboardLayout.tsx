import { AppShell, Box, MediaQuery } from "@mantine/core";

import { FC, ReactNode } from "react";
import { LayoutErrorBoundary } from "../LayoutErrorBoundary";
import { Header } from "./Header";
import { SideNav } from "./SideNav";

export const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AppShell
      padding="md"
      styles={(theme) => ({
        body: { minHeight: "100vh" },
        main: { padding: 0, backgroundColor: theme.colors.gray[2] },
      })}
      navbar={
        <MediaQuery smallerThan="lg" styles={{ display: "none" }}>
          <SideNav />
        </MediaQuery>
      }
      header={<Header />}
    >
      <Box py="xl" px="md">
        <LayoutErrorBoundary>{children}</LayoutErrorBoundary>
      </Box>
    </AppShell>
  );
};
