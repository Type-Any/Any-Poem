import Document, { Head, Main, NextDocumentContext, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

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
          <link href="https://fonts.googleapis.com/css?family=Nanum+Myeongjo|Noto+Sans" rel="stylesheet" />
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
