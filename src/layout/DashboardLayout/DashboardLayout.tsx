import { AppShell, Box } from "@mantine/core";
import { FC, ReactNode } from "react";
import { LayoutErrorBoundary } from "../LayoutErrorBoundary";
import { Header } from "./Header";
import { SideNav } from "./SideNav";
import { Sidebar } from "src/components/Sidebar";

export const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AppShell
      styles={(theme) => ({
        body: { minHeight: "100vh" },
        main: { padding: 0, backgroundColor: theme.colors.gray[2] },
      })}
      header={<Header />}
      navbar={<SideNav />}
      aside={<Sidebar />}
    >
      <Box>
        <LayoutErrorBoundary>{children}</LayoutErrorBoundary>
      </Box>
    </AppShell>
  );
};
