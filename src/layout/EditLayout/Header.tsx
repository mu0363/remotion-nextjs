// FIXME:
/* eslint-disable no-console */
import { Button, Container, createStyles, Header as MantineHeader } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import type { FC } from "react";
import { HEADER_HEIGHT } from "src/libs/const";

const useStyles = createStyles((theme) => ({
  root: {
    height: HEADER_HEIGHT,
    [theme.fn.smallerThan("md")]: {
      height: 40,
    },
  },
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.fn.smallerThan("md")]: {
      height: 40,
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

/** @package */
export const Header: FC = () => {
  const { classes } = useStyles();

  return (
    <MantineHeader height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.inner} fluid>
        <Button component="a" href="/dashboard" leftIcon={<IconArrowLeft />} variant="subtle">
          戻る
        </Button>
      </Container>
    </MantineHeader>
  );
};
