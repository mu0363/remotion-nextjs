import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          {/** font.cssにも設定すること */}
          <link
            href="https://fonts.googleapis.com/css2?family=BIZ+UDPGothic:wght@400;700&family=Hina+Mincho&family=Sawarabi+Mincho&family=Kaisei+Decol:wght@700&family=Kiwi+Maru&family=Rampart+One&family=Shippori+Mincho+B1:wght@600&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
