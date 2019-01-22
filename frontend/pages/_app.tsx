import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import { ApolloProvider } from "react-apollo";
import Nav from "../components/Nav";
import withApollo from "../lib/withApollo";
import { NextContextWithApollo } from "../types/types";

class MyApp extends App<NextContextWithApollo> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <Head>
          <title>Any Poem</title>
        </Head>
        <ApolloProvider client={apolloClient}>
          <Nav />
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
