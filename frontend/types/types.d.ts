import { ApolloClient } from "apollo-client";
import { NextContext } from "next";

interface NextContextWithApollo extends NextContext {
  apolloClient: ApolloClient;
}

interface ApolloClientType {
  client: ApolloClient;
}
