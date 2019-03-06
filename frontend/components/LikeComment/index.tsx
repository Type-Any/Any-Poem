import React from "react";
import { Comment } from "../../types/graph";
import { Mutation } from "react-apollo";
import { LIKE_COMMENT } from "../Comments/CommentsQueries";

interface IProps {
  comment: Comment;
}

const LikeComment = (props: IProps) => {
  const { comment } = props;
  return (
    <div>
      <div>{comment && comment.likes ? comment.likes.length : "0"}명이 좋아합니다.</div>
      <Mutation mutation={LIKE_COMMENT} variables={{ commentId: comment.id }}>
        {LikeComment => <button onClick={() => LikeComment()}>공감</button>}
      </Mutation>
    </div>
  );
};

export default LikeComment;
