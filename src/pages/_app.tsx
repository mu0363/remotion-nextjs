import "../style.css";
import { MantineProvider } from "@mantine/core";
import { PlayerLayout } from "../layout/PlayerLayout";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
      }}
    >
      <PlayerLayout>
        <Component {...pageProps} />
      </PlayerLayout>
    </MantineProvider>
  );
}

export default MyApp;
