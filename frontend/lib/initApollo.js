import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import { withClientState } from "apollo-link-state";
import fetch from "cross-fetch";
import defaults from "./client/defaults";
import resolvers from "./client/resolvers";

let _apolloClient = null;

const isServer = typeof window === "undefined";

if (isServer) {
  global.fetch = fetch;
}

const create = (initCache, token) => {
  const httpLink = createUploadLink({
    uri: process.env.GRAPHQL_URL,
    credentials: "same-origin"
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
    connectToDevTools: !isServer,
    ssrMode: isServer,
    link: ApolloLink.from([authLink, stateLink, httpLink]),
    cache
  });
};

const initApollo = (initCache, token) => {
  if (isServer) {
    return create(initCache, token);
  }

  if (!_apolloClient) {
    _apolloClient = create(initCache, token);
  }

  return _apolloClient;
};

export default initApollo;
