import { Box, MediaQuery, Navbar, useMantineTheme } from "@mantine/core";
import { FC } from "react";
import { SIDENAV_WIDTH } from "src/libs/const";

/** @package */
export const SideNav: FC = () => {
  return (
    <MediaQuery smallerThan="md" styles={{ display: "none" }}>
      <Navbar p="xs" width={{ base: SIDENAV_WIDTH }}>
        <Navbar.Section>
          <User />
        </Navbar.Section>
      </Navbar>
    </MediaQuery>
  );
};

const User = () => {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
      }}
    ></Box>
  );
};
