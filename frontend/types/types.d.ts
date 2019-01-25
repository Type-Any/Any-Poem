import Global = NodeJS.Global;
import fetch from "cross-fetch";
import { ApolloClient } from "apollo-client";
import { NextContext, NextComponentType } from "next";
import { AppProps, NextAppContext } from "next/app";
import { NormalizedCacheObject } from "apollo-cache-inmemory";

interface GlobalFetch extends Global {
  fetch: fetch;
}

interface ctxWithApollo<Q extends DefaultQuery = DefaultQuery> extends NextContext<Q> {
  // Custom prop added by withApollo
  apolloClient: ApolloClient<any>;
}

declare const ctx: ctxWithApollo;

interface NextAppContextWithApollo extends NextAppContext {
  ctx: ctxWithApollo;
}

interface WithApolloProps<TCache> {
  apolloCache: WithApolloState<TCache>;
}

interface NextAppContextWithApollo<Q extends DefaultQuery = DefaultQuery> extends NextContext<Q> {
  // Custom prop added by withApollo
  apolloClient: ApolloClient<any>;
}

interface AppPropsWithApollo {
  Component: NextComponentType<any, any, NextContextWithApollo>;
  pageProps: any;
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

interface IProfile {
  id: number;
  email: string;
  fullName: string;
  penName: string;
  createdAt: string;
  updatedAt: string;
}
