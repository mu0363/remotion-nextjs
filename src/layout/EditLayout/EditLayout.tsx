import { AppShell, Center, createStyles } from "@mantine/core";
import { ASIDE_WIDTH, HEADER_HEIGHT, HEADER_HEIGHT_SM } from "src/libs/const";
import { LayoutErrorBoundary } from "../LayoutErrorBoundary";
import { ASide } from "./ASide";
import { Header } from "./Header";
import type { FC, ReactNode } from "react";

const useStyles = createStyles((theme) => {
  return {
    appShell: {
      body: { minHeight: "100vh" },
      main: { padding: 0, backgroundColor: theme.colors.gray[1] },
    },
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

type Props = {
  children: ReactNode;
};

/** @package */
export const EditLayout: FC<Props> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <Center>
      <AppShell className={classes.appShell} header={<Header />} aside={<ASide />}>
        <div className={classes.container}>
          <LayoutErrorBoundary>{children}</LayoutErrorBoundary>
        </div>
      </AppShell>
    </Center>
  );
};

// fontFamily: "Kiwi Maru",
