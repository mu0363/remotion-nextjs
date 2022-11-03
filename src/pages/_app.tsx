import "../styles/global.css";
import "../styles/font.css";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "src/libs/store";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps<{ initialSession: Session }>) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
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
                <Component {...pageProps} />
              </MantineProvider>
            </ColorSchemeProvider>
          </QueryClientProvider>
        </JotaiProvider>
      </Provider>
    </SessionContextProvider>
  );
};

export default MyApp;
