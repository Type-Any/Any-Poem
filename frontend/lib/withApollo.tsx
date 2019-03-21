import { NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import cookie, { CookieParseOptions } from "cookie";
import "cross-fetch/polyfill";
import { NextContext } from "next";
import { AppProps, default as NextApp, DefaultAppIProps } from "next/app";
import Head from "next/head";
import React from "react";
import { getDataFromTree } from "react-apollo";
import { NextAppContextWithApollo, WithApolloProps } from "../types/types";
import initApollo from "./initApollo";

const parseCookies = (req: NextContext["req"], options: CookieParseOptions = {}) =>
  cookie.parse(req ? req.headers.cookie || "" : document.cookie, options);

export default function withApollo<TCache = any>(App: typeof NextApp) {
  type ApolloProps = WithApolloProps<TCache>;

  return class WithData extends React.Component<ApolloProps & AppProps & DefaultAppIProps> {
    static async getInitialProps(context: NextAppContextWithApollo) {
      const { Component, router, ctx } = context;

      const { anypoemJWT } = parseCookies(ctx.req);

      const apolloClient = initApollo({}, anypoemJWT);
      ctx.apolloClient = apolloClient;

      let appProps = { pageProps: {} };
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(context);
      }

      if (ctx.res && ctx.res.finished) {
        return {};
      }

      if (ctx.req) {
        try {
          await getDataFromTree(
            <App {...appProps} apolloClient={apolloClient} router={router} Component={Component} />
          );
        } catch (error) {
          console.error(error);
        }
        Head.rewind();
      }

      const apolloCache = apolloClient.cache.extract();

      return {
        ...appProps,
        apolloCache,
        anypoemJWT
      };
    }
    apolloClient: ApolloClient<NormalizedCacheObject>;
    constructor(props: ApolloProps & AppProps & DefaultAppIProps & { anypoemJWT: string }) {
      super(props);
      this.apolloClient = initApollo(props.apolloCache, props.anypoemJWT);
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
}
