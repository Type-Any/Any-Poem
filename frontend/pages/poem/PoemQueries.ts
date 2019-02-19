import gql from "graphql-tag";

export const GET_POEMS = gql`
  query getPoems($skip: Int!, $take: Int!) {
    GetPoems(skip: $skip, take: $take) {
      ok
      error
      poems {
        id
        title
        text
        poet {
          id
          fullName
          penName
        }
      }
    }
  }
`;

export const GET_POEM = gql`
  query getPoem($poemId: Int!) {
    GetPoem(poemId: $poemId) {
      ok
      error
      poem {
        id
        title
        text
        poet {
          id
          fullName
          penName
        }
      }
    }
  }
`;
