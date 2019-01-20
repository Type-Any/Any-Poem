import gql from "graphql-tag";

export const ME = gql`
  query {
    GetMyProfile {
      ok
      profile {
        id
        email
        firstName
        lastName
        fullName
        createdAt
        updatedAt
      }
      error
    }
  }
`;

export default apolloClient =>
  apolloClient
    .query({
      query: ME
    })
    .then(({ data: { GetMyProfile } }) => {
      return { loggedInUser: GetMyProfile };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: null };
    });
