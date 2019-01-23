import "cross-fetch/polyfill";
import cookie from "cookie";
import React from "react";
import Head from "next/head";
import { getDataFromTree } from "react-apollo";
import initApollo from "./initApollo";

const parseCookies = (req, options = {}) => cookie.parse(req ? req.headers.cookie || "" : document.cookie, options);

export default App =>
  class WithData extends React.Component {
    static async getInitialProps(context) {
      const { Component, router, ctx } = context;

      const { token } = parseCookies(ctx.req);

      const apolloClient = initApollo({}, token);
      ctx.apolloClient = apolloClient;

      let appProps = {};
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
        token
      };
    }

    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloCache, props.token);
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
