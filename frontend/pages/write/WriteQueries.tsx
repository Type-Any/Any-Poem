import gql from "graphql-tag";

export const SAVE_POEM = gql`
  mutation savePoem($title: String!, $text: String!) {
    SavePoem(title: $title, text: $text) {
      ok
      error
      poem {
        id
        poet {
          id
          fullName
          penName
        }
        title
        text
        createdAt
        updatedAt
      }
    }
  }
`;
