import gql from "graphql-tag";

export const EMAIL_SIGN_IN = gql`
  mutation emailSignIn($email: String!, $password: String, $oauthId: String) {
    EmailSignIn(email: $email, password: $password, oauthId: $oauthId) {
      ok
      error
      token
    }
  }
`;
