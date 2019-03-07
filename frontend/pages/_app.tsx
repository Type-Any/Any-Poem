import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { createGlobalStyle } from "styled-components";
import withApollo from "../lib/withApollo";
import { AppPropsWithApollo } from "../types/types";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    width: 100%;
    margin: 0;
  }

  body {
    font-size: 11px;
    width: 100%;
    background: #ffffff;
    font-family: sans-serif;
    color: #444444;
    display: flex;
    justify-content: center;
  }

  #__next {
		min-width: 1024pt;
		width: 100%;
    margin: 0;
  }
`;

class MyApp extends App<AppPropsWithApollo> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <Head>
          <title>Any Poem</title>
        </Head>
        <GlobalStyle />
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
