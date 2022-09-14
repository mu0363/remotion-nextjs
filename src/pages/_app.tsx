import "../styles/global.css";
import "../styles/font.css";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "src/libs/store";
import type { CustomAppPage } from "next/app";

const queryClient = new QueryClient();

const MyApp: CustomAppPage = ({ Component, pageProps }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const getLayout =
    Component.getLayout ||
    ((page) => {
      // FIXME:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return page;
    });

  return (
    <Provider store={store}>
      <JotaiProvider>
        <QueryClientProvider client={queryClient}>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{
                /** Put your mantine theme override here */
                colorScheme: "light",
              }}
            >
              {getLayout(<Component {...pageProps} />)}
            </MantineProvider>
          </ColorSchemeProvider>
        </QueryClientProvider>
      </JotaiProvider>
    </Provider>
  );
};

export default MyApp;
