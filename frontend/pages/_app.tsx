import App, { AppComponentContext, Container } from "next/app";
import Head from "next/head";
import React from "react";
import Nav from "../components/Nav";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }: AppComponentContext) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>Any Poem</title>
        </Head>
        <Nav />
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
