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

export default apolloClient =>
  apolloClient
    .query({
      query: ME
    })
    .then(({ data: { GetMyProfile } }) => ({ loggedInUser: GetMyProfile }))
    .catch(() => ({ loggedInUser: null }));
