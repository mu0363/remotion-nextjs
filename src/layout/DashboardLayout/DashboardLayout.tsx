import { AppShell, createStyles } from "@mantine/core";
import { HEADER_HEIGHT, SIDENAV_WIDTH } from "src/libs/const";
import { LayoutErrorBoundary } from "../LayoutErrorBoundary";
import { Header } from "./Header";
import { SideNav } from "./SideNav";
import type { CustomLayout } from "next";

const useStyles = createStyles((theme) => {
  return {
    container: {
      marginLeft: SIDENAV_WIDTH,
      marginTop: HEADER_HEIGHT,

      [`@media (max-width: ${theme.breakpoints.md}px)`]: {
        marginLeft: 0,
        marginRight: 0,
      },
    },
  };
});

/** @package */
export const DashboardLayout: CustomLayout = (page) => {
  const { classes } = useStyles();

  return (
    <AppShell
      styles={(theme) => ({
        body: { minHeight: "100vh" },
        main: { padding: 0, backgroundColor: theme.colors.gray[0] },
      })}
      header={<Header />}
      navbar={<SideNav />}
    >
      <div className={classes.container}>
        <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
      </div>
    </AppShell>
  );
};
