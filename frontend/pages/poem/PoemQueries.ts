import gql from "graphql-tag";

export const FRAGMENT_POEM = gql`
  fragment FragmentPoem on Poem {
    id
    title
    text
    poet {
      id
      fullName
      penName
    }
    likes {
      id
      fullName
      penName
    }
    createdAt
    updatedAt
  }
`;

export const GET_POEMS = gql`
  query getPoems($skip: Int!, $take: Int!) {
    GetPoems(skip: $skip, take: $take) {
      ok
      error
      poems {
        ...FragmentPoem
      }
    }
  }
  ${FRAGMENT_POEM}
`;

export const GET_POEM = gql`
  query getPoem($poemId: Int!) {
    GetPoem(poemId: $poemId) {
      ok
      error
      poem {
        ...FragmentPoem
      }
    }
  }
  ${FRAGMENT_POEM}
`;
