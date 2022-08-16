import "../style.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { PlayerLayout } from "../layout/PlayerLayout";

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
