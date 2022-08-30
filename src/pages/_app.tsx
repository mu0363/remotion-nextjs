import "../styles/global.css";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider } from "react-redux";
import type { CustomAppPage } from "next/app";
import { store } from "src/store";

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
    </Provider>
  );
};

export default MyApp;
