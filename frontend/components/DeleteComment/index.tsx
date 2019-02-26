import React from "react";
import { Mutation } from "react-apollo";
import { DELETE_COMMENT } from "./DeleteCommentQueries";
import { Comment } from "../../types/graph";

interface IProps {
  comment: Comment;
}

const DeleteComment = (props: IProps) => {
  const { comment } = props;
  return (
    <Mutation mutation={DELETE_COMMENT} variables={{ commentId: comment.id }}>
      {DeleteComment => (
        <button
          onClick={() => {
            DeleteComment();
          }}
        >
          삭제
        </button>
      )}
    </Mutation>
  );
};

export default DeleteComment;
