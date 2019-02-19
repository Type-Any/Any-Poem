import React, { useState } from "react";
import { Comment, GetCommentsResponse } from "../../types/graph";
import useHandleInput from "../../utils/useHandleInput";
import { Mutation } from "react-apollo";
import { SAVE_COMMENT, GET_COMMENTS, FRAGMENT_COMMENT } from "./CommentsQueries";

interface IProps {
  poemId: number;
  comments: Comment[];
}

const Comments = ({ poemId, comments, children }) => {
  return (
    <div>
      {comments.map(comment => (
        <Comment1 key={comment.id} poemId={poemId} comment={comment} children={children} />
      ))}
    </div>
  );
};

const Comment1 = ({ poemId, comment, children }) => {
  const recomment = useHandleInput("");
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  if (!comment.parent) {
    return (
      <Mutation
        mutation={SAVE_COMMENT}
        variables={{ poemId, parentId: comment.id, text: recomment.value }}
        update={(cache, { data: { SaveComment } }) => {
          const comments: { GetComments: GetCommentsResponse } | null = cache.readQuery({
            query: GET_COMMENTS,
            variables: { poemId, skip: 0, take: 10 }
          });

          if (comments) {
            const { GetComments } = comments;

            if (GetComments.ok) {
              let newComments;
              if (GetComments.comments) {
                newComments = {
                  ...GetComments,
                  comments: [SaveComment.comment, ...GetComments.comments]
                };
              } else {
                newComments = SaveComment;
              }

              cache.writeQuery({
                query: GET_COMMENTS,
                variables: { poemId, skip: 0, take: 10 },
                data: { GetComments: newComments }
              });

              const parentComment = cache.readFragment({
                id: `Comment:${comment.id}`,
                fragment: FRAGMENT_COMMENT
              });

              if (parentComment) {
                let newParentComment;
                if (parentComment.children.length > 0) {
                  newParentComment = {
                    ...parentComment,
                    children: [...parentComment.children, SaveComment.comment]
                  };
                } else {
                  newParentComment = {
                    ...parentComment,
                    children: [SaveComment.comment]
                  };
                }

                cache.writeFragment({
                  id: `Comment:${comment.id}`,
                  fragment: FRAGMENT_COMMENT,
                  data: newParentComment
                });
              } else {
                console.log("부모 댓글 Fragment 찾기 실패");
              }
            } else {
              console.log(GetComments.error);
            }
          } else {
            console.log("Commens cache 업데이트 에러");
          }
        }}
      >
        {SaveComment => {
          return (
            <div>
              <div key={comment.id} style={{ display: "flex", flexDirection: "row" }}>
                {children && <span>▶️</span>}
                <div>{comment.text}</div>
                <div>{comment.parent && comment.parent.id}</div>
                {!children && <button onClick={() => setIsCommentOpen(true)}>대댓글</button>}
              </div>
              {isCommentOpen && (
                <div>
                  <textarea {...recomment} />
                  <button onClick={() => setIsCommentOpen(false)}>취소</button>
                  <button
                    onClick={() => {
                      SaveComment();
                      recomment.onChange({ currentTarget: { value: "" } });
                      setIsCommentOpen(false);
                    }}
                  >
                    저장
                  </button>
                </div>
              )}

              {comment.children && <Comments poemId={poemId} comments={comment.children} children={true} />}
            </div>
          );
        }}
      </Mutation>
    );
  } else {
    return <div />;
  }
};

const CommentList = (props: IProps) => {
  const { poemId, comments } = props;
  if (comments.length > 0) {
    return <Comments poemId={poemId} comments={comments} />;
  } else {
    return <div>댓글이 없어요...</div>;
  }
};

export default CommentList;
