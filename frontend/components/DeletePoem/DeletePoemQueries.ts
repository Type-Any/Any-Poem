import gql from "graphql-tag";

export const DELETE_POEM = gql`
  mutation deletePoem($poemId: Int!) {
    DeletePoem(poemId: $poemId) {
      ok
      error
    }
  }
`;
