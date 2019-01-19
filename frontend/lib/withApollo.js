import "cross-fetch/polyfill";
import cookie from "cookie";
import React from "react";
import Head from "next/head";
import { getDataFromTree } from "react-apollo";
import initApollo from "./initApollo";

const parseCookies = (req, options = {}) => cookie.parse(req ? req.headers.cookie || "" : document.cookie, options);

export default App =>
  class WithData extends React.Component {
    static async getInitialProps({ ctx, router, Component }) {
      const props = {};

      if (Component.getInitialProps) props.pageProps = await Component.getInitialProps(ctx);

      const token = parseCookies(ctx.req).token;
      props.token = token;

      if (ctx.req) {
        const apolloClient = initApollo({}, token);
        try {
          await getDataFromTree(
            <WithData {...props} apolloClient={apolloClient} router={router} Component={Component} />
          );
        } catch (error) {
          console.error(error);
        }
        Head.rewind();
        props.apolloCache = apolloClient.cache.extract();
      }

      return props;
    }

    apolloClient = this.props.apolloClient || initApollo(this.props.apolloCache, this.props.token);

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
