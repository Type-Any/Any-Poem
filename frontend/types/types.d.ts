import Global = NodeJS.Global;
import { ApolloCache } from "apollo-cache";
import { NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import fetch from "cross-fetch";
import { IncomingMessage } from "http";
import { NextComponentType, NextContext } from "next";
import { AppProps, NextAppContext } from "next/app";

interface GlobalFetch extends Global {
  fetch: fetch;
}

interface ctxWithApollo<Q extends DefaultQuery = DefaultQuery> extends NextContext<Q> {
  // Custom prop added by withApollo
  apolloClient: ApolloClient<any>;
}

declare const ctx: ctxWithApollo;

interface IPropsWithApollo {
  client: ApolloClient<any>;
}

interface NextAppContextWithApollo extends NextAppContext {
  ctx: ctxWithApollo;
}

interface WithApolloProps<TCache> {
  apolloCache: ApolloCache<TCache>;
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

export interface IncomingMessageWithOauthUser extends IncomingMessage {
  user: any;
}

export interface IctxWithApolloAndOauthUser extends ctxWithApollo {
  req: IncomingMessageWithOauthUser;
}

export interface IOauthUserResponse {
  provider: string;
  id: string;
  email: string;
  fullName: string;
}
