import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { createGlobalStyle } from "styled-components";
import withApollo from "../lib/withApollo";
import { AppPropsWithApollo } from "../types/types";

const GlobalStyle = createGlobalStyle`
  html, body, div, span, object, iframe,
  h1, h2, h3, h4, h5, h6, p, pre, address,
  del, dfn, em, img, strong, b, i,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, figcaption, figure,
  footer, header, hgroup, menu, nav, section, audio, video {
      margin:0;
      padding:0;
      border:0;
      outline:0;
      font-size:100%;
      vertical-align:baseline;
      background:transparent;
  }

  :after,
  :before {
    content: "";
    display: block;
    clear: both;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  table {
    border-collapse:collapse;
    border-spacing:0;
  }

  button {
    outline: none;
    border: none;
    background: none;
  }

  a {
    margin:0;
    padding:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
    text-decoration: none;
  }

  article,aside,details,figcaption,figure,
  footer,header,hgroup,menu,nav,section {
      display:block;
  }

  nav ul,
  ul,
  li{
      list-style:none;
  }

  html, body {
    font-family: "Noto Sans","Helvetica Neue", Arial, sans-serif;
    width: 100%;
  }

  body {
    font-size: 11px;
    width: 100%;
    background: #fff;
    color: #444;
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
          <link href="https://fonts.googleapis.com/css?family=Nanum+Myeongjo|Noto+Sans" rel="stylesheet" />
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
