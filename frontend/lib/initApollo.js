import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import { withClientState } from "apollo-link-state";
import defaults from "./client/defaults";
import resolvers from "./client/resolvers";

const initApollo = (initCache = {}, token) => {
  const httpLink = createUploadLink({
    uri: process.env.GRAPHQL_URL,
    credentials: "same-origin"
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `X-JWT ${token}` : ""
      }
    };
  });

  const cache = new InMemoryCache().restore(initCache);

  const stateLink = withClientState({
    defaults,
    resolvers
  });

  return new ApolloClient({
    ssrMode: typeof window !== "undefined",
    link: ApolloLink.from([authLink, stateLink, httpLink]),
    cache
  });
};

export default initApollo;
