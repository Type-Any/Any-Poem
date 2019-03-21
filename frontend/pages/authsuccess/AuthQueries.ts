import gql from "graphql-tag";

export const CHECK_USER_EXISTS = gql`
  query checkUserExists($email: String, $oauthId: String) {
    CheckUserExists(email: $email, oauthId: $oauthId) {
      ok
      error
      user {
        id
        email
        fullName
        penName
        bio
        avatar
        createdAt
        updatedAt
      }
    }
  }
`;
