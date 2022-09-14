import { AppShell, Navbar, Header, Text, MediaQuery, Burger, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import type { FC, ReactNode } from "react";

export const PlayerLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useMantineTheme();
  const [isOpened, setIsOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!isOpened} width={{ sm: 200, lg: 300 }}>
          <Text>Application navbar</Text>
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={isOpened}
                onClick={() => setIsOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};
