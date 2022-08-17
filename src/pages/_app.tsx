import "../styles/global.css";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { PlayerLayout } from "../layout/PlayerLayout";
import type { AppProps } from "next/app";
import { store } from "src/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default MyApp;
