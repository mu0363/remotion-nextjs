import { AppShell, createStyles } from "@mantine/core";
import { CustomLayout } from "next";
import { LayoutErrorBoundary } from "../LayoutErrorBoundary";
import { ASide } from "./ASide";
import { Header } from "./Header";
import { SideNav } from "./SideNav";
import { ASIDE_WIDTH, HEADER_HEIGHT, SIDENAV_WIDTH } from "src/libs/const";

const useStyles = createStyles((theme) => {
  return {
    container: {
      marginLeft: SIDENAV_WIDTH,
      marginTop: HEADER_HEIGHT,
      marginRight: ASIDE_WIDTH,

      [`@media (max-width: ${theme.breakpoints.md}px)`]: {
        marginLeft: 0,
        marginRight: 0,
      },
    },
  };
});

/** @package */
export const EditLayout: CustomLayout = (page) => {
  const { classes } = useStyles();

  return (
    <AppShell
      styles={(theme) => ({
        body: { minHeight: "100vh" },
        main: { padding: 0, backgroundColor: theme.colors.gray[0] },
      })}
      header={<Header />}
      navbar={<SideNav />}
      aside={<ASide />}
    >
      <div className={classes.container}>
        <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
      </div>
    </AppShell>
  );
};
