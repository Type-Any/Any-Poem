import gql from "graphql-tag";

export const EMAIL_SIGN_UP = gql`
  mutation emailSignIn($email: String!, $password: String!, $fullName: String!, $penName: String!) {
    EmailSignUp(email: $email, password: $password, fullName: $fullName, penName: $penName) {
      ok
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
      token
      error
    }
  }
`;
