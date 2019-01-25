import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { withClientState } from "apollo-link-state";
import { createUploadLink } from "apollo-upload-client";
import fetch from "cross-fetch";
import defaults from "./client/defaults";
import resolvers from "./client/resolvers";

declare const global: GlobalFetch;

let _apolloClient: ApolloClient<NormalizedCacheObject>;

const isServer = typeof window === "undefined";

if (isServer) {
  global.fetch = fetch;
}

const create = (initCache: NormalizedCacheObject, token: string) => {
  const httpLink = createUploadLink({
    credentials: "same-origin",
    uri: process.env.GRAPHQL_URL
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: token ? `X-JWT ${token}` : ""
    }
  }));

  const cache = new InMemoryCache().restore(initCache || {});

  const stateLink = withClientState({
    defaults,
    resolvers
  });

  return new ApolloClient({
    cache,
    connectToDevTools: !isServer,
    link: ApolloLink.from([authLink, stateLink, httpLink]),
    ssrMode: isServer
  });
};

const initApollo = (initCache: NormalizedCacheObject | {}, token: string) => {
  if (isServer) {
    return create(initCache, token);
  }

  if (!_apolloClient) {
    _apolloClient = create(initCache, token);
  }

  return _apolloClient;
};

export default initApollo;
