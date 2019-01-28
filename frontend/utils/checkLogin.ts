import { ApolloClient, ApolloQueryResult } from "apollo-client";
import gql from "graphql-tag";

export const ME = gql`
  query {
    GetMyProfile {
      ok
      profile {
        id
        email
        fullName
        penName
        bio
        avatar
        createdAt
        updatedAt
      }
      error
    }
  }
`;

export default (apolloClient: ApolloClient<any>) =>
  apolloClient
    .query({
      query: ME
    })
    .then(({ data: { GetMyProfile } }: ApolloQueryResult<any>) => ({
      loggedInUser: GetMyProfile
    }))
    .catch(() => ({ loggedInUser: null }));
