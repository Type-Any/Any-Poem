import gql from "graphql-tag";
import { FRAGMENT_POEM } from "../poem/PoemQueries";

export const SAVE_POEM = gql`
  mutation savePoem($title: String!, $text: String!) {
    SavePoem(title: $title, text: $text) {
      ok
      error
      poem {
        ...FragmentPoem
      }
    }
  }
  ${FRAGMENT_POEM}
`;

export const UPDATE_POEM = gql`
  mutation updatePoem($poemId: Int!, $title: String, $text: String, $isPublished: Boolean) {
    UpdatePoem(poemId: $poemId, title: $title, text: $text, isPublished: $isPublished) {
      ok
      error
      poem {
        ...FragmentPoem
      }
    }
  }
  ${FRAGMENT_POEM}
`;

export const LIKE_POEM = gql`
  mutation likePoem($poemId: Int!) {
    LikePoem(poemId: $poemId) {
      ok
      error
      poem {
        ...FragmentPoem
      }
    }
  }
  ${FRAGMENT_POEM}
`;
