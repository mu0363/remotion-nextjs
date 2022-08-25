import {
  Avatar,
  Box,
  Group,
  MediaQuery,
  Navbar,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { IconAlertCircle, IconMessages, IconDatabase, IconChevronRight, IconChevronLeft } from "@tabler/icons";
import { FC } from "react";
import { getPath, SIDENAV_WIDTH } from "src/libs/const";
import { ActiveLink } from "src/libs/next";

/** @package */
export const SideNav: FC = () => {
  return (
    <MediaQuery smallerThan="md" styles={{ display: "none" }}>
      <Navbar p="xs" width={{ base: SIDENAV_WIDTH }}>
        <Navbar.Section grow mt="sm">
          <MainLinks />
        </Navbar.Section>
        <Navbar.Section>
          <User />
        </Navbar.Section>
      </Navbar>
    </MediaQuery>
  );
};

type MainLinkProps = {
  icon: React.ReactNode;
  color: string;
  label: string;
  href: string;
};

const MainLink = ({ icon, color, label, href }: MainLinkProps) => {
  return (
    <ActiveLink href={href} passHref>
      {(isActive) => {
        return (
          <UnstyledButton
            sx={(theme) => ({
              display: "block",
              width: "100%",
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color: isActive ? theme.colors.blue[8] : theme.colors.gray[7],
              backgroundColor: isActive ? theme.colors.blue[0] : "white",
              fontWeight: isActive ? "bold" : "normal",

              "&:hover": {
                backgroundColor: isActive ? theme.colors.blue[0] : theme.colors.gray[0],
              },
            })}
          >
            <Group>
              <ThemeIcon color={color} variant="light">
                {icon}
              </ThemeIcon>
              <Text size="sm">{label}</Text>
            </Group>
          </UnstyledButton>
        );
      }}
    </ActiveLink>
  );
};

const data = [
  { icon: <IconAlertCircle size={16} />, color: "teal", label: "Dashboard", href: getPath("DASHBOARD") },
  { icon: <IconMessages size={16} />, color: "violet", label: "Discussions", href: getPath("INDEX") },
  { icon: <IconDatabase size={16} />, color: "grape", label: "Databases", href: getPath("INDEX") },
];

const MainLinks = () => {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
};

const User = () => {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
      }}
    >
      <UnstyledButton
        sx={{
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
          },
        }}
      >
        <Group>
          <Avatar
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            radius="xl"
          />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              Amy Horsefighter
            </Text>
            <Text color="dimmed" size="xs">
              ahorsefighter@gmail.com
            </Text>
          </Box>

          {theme.dir === "ltr" ? <IconChevronRight size={18} /> : <IconChevronLeft size={18} />}
        </Group>
      </UnstyledButton>
    </Box>
  );
};
