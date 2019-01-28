import Document, { Head, Main, NextDocumentContext, NextScript } from "next/document";
import { createGlobalStyle, ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document<IProps> {
  static getInitialProps({ renderPage }: NextDocumentContext) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="author" content={"type-any"} />
          <link rel="shortcut icon" href="static/favicon.ico" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

interface IProps {
  styleTags: [];
}
