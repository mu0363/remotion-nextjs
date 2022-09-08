import { AppShell, createStyles } from "@mantine/core";
import { CustomLayout } from "next";
import { LayoutErrorBoundary } from "../LayoutErrorBoundary";
import { ASide } from "./ASide";
import { Header } from "./Header";
import { ASIDE_WIDTH, HEADER_HEIGHT, HEADER_HEIGHT_SM } from "src/libs/const";

const useStyles = createStyles((theme) => {
  return {
    appShell: { body: { minHeight: "100vh" }, main: { padding: 0, backgroundColor: theme.colors.gray[1] } },
    container: {
      marginTop: HEADER_HEIGHT,
      marginRight: ASIDE_WIDTH,

      [theme.fn.smallerThan("md")]: {
        marginTop: HEADER_HEIGHT_SM,
        marginRight: 0,
      },
    },
  };
});

/** @package */
export const EditLayout: CustomLayout = (page) => {
  const { classes } = useStyles();

  return (
    <AppShell className={classes.appShell} header={<Header />} aside={<ASide />}>
      <div className={classes.container}>
        <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
      </div>
    </AppShell>
  );
};

// fontFamily: "Kiwi Maru",
