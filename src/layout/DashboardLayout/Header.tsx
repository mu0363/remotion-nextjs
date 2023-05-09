// FIXME:
/* eslint-disable no-console */
import { Burger, Container, createStyles, Group, Header as MantineHeader, MediaQuery } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AvantIcon } from "src/components/SVG";
import { HEADER_HEIGHT } from "src/libs/const";
import { useMutateAuth } from "src/libs/hooks/useMutateAuth";
import type { FC } from "react";

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

/** @package */
export const Header: FC = () => {
  const { signout } = useMutateAuth();
  const { classes } = useStyles();
  const [isOpened, { toggle }] = useDisclosure(false);

  return (
    <MantineHeader height={HEADER_HEIGHT}>
      <Container className={classes.inner} fluid>
        <Group>
          <MediaQuery largerThan="md" styles={{ display: "none" }}>
            <Burger opened={isOpened} onClick={toggle} size="sm" />
          </MediaQuery>

          <div className="flex justify-between">
            <AvantIcon />
            <button onClick={signout}>Signout</button>
          </div>
        </Group>
      </Container>
    </MantineHeader>
  );
};
