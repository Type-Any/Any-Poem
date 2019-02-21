import gql from "graphql-tag";

export const FRAGMENT_COMMENT = gql`
  fragment FragmentComment on Comment {
    id
    commenter {
      id
      fullName
      penName
    }
    text
    createdAt
    updatedAt
    parent {
      id
      commenter {
        id
        fullName
        penName
      }
      text
      createdAt
      updatedAt
    }
    children {
      id
      commenter {
        id
        fullName
        penName
      }
      text
      createdAt
      updatedAt
    }
  }
`;

export const GET_COMMENTS = gql`
  query getComments($poemId: Int!, $skip: Int!, $take: Int!) {
    GetComments(poemId: $poemId, skip: $skip, take: $take) {
      ok
      error
      comments {
        ...FragmentComment
      }
    }
  }
  ${FRAGMENT_COMMENT}
`;

export const SAVE_COMMENT = gql`
  mutation saveComment($poemId: Int!, $parentId: Int, $text: String!) {
    SaveComment(poemId: $poemId, parentId: $parentId, text: $text) {
      ok
      error
      comment {
        ...FragmentComment
      }
    }
  }
  ${FRAGMENT_COMMENT}
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($commentId: Int!, $text: String) {
    UpdateComment(commentId: $commentId, text: $text) {
      ok
      error
      comment {
        ...FragmentComment
      }
    }
  }
  ${FRAGMENT_COMMENT}
`;

export const LIKE_COMMENT = gql`
  mutation likeComment($commentId: Int!) {
    ok
    error
    comment {
      ...FragmentComment
    }
  }
  ${FRAGMENT_COMMENT}
`;
