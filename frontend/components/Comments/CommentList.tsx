import React, { useState } from "react";
import { Comment, GetCommentsResponse } from "../../types/graph";
import useHandleInput from "../../utils/useHandleInput";
import { Mutation } from "react-apollo";
import { SAVE_COMMENT, GET_COMMENTS, FRAGMENT_COMMENT, UPDATE_COMMENT } from "./CommentsQueries";
import LikeComment from "../LikeComment";

interface ICommentListProps {
  poemId: number;
  comments: Comment[];
}

interface ICommentsProps {
  poemId: number;
  comments: Comment[];
  children?: boolean;
}

interface ICommentEachProps {
  poemId: number;
  comment: Comment;
  children: boolean | undefined;
}

const Comments = ({ poemId, comments, children }: ICommentsProps) => {
  return (
    <div>
      {comments.map(comment => (
        <CommentEach key={comment.id} poemId={poemId} comment={comment} children={children} />
      ))}
    </div>
  );
};

const CommentEach = ({ poemId, comment, children }: ICommentEachProps) => {
  const reComment = useHandleInput("");
  const updateComment = useHandleInput(comment.text);
  const [isReCommentOpen, setIsReCommentOpen] = useState(false);
  const [isUpdateCommentOpen, setIsUpdateCommentOpen] = useState(false);

  if (!comment.parent) {
    return (
      <Mutation
        mutation={SAVE_COMMENT}
        variables={{ poemId, parentId: comment.id, text: reComment.value }}
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

              const parentComment: Comment | null = cache.readFragment({
                id: `Comment:${comment.id}`,
                fragment: FRAGMENT_COMMENT
              });

              if (parentComment) {
                let newParentComment;
                if (parentComment.children) {
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
              {isUpdateCommentOpen ? (
                <Mutation
                  mutation={UPDATE_COMMENT}
                  variables={{
                    commentId: comment.id,
                    text: updateComment.value
                  }}
                >
                  {UpdateComment => {
                    return (
                      <div>
                        <textarea {...updateComment} />
                        <button onClick={() => setIsUpdateCommentOpen(false)}>취소</button>
                        <button
                          onClick={() => {
                            UpdateComment();
                            setIsUpdateCommentOpen(false);
                          }}
                        >
                          저장
                        </button>
                      </div>
                    );
                  }}
                </Mutation>
              ) : (
                <div key={comment.id} style={{ display: "flex", flexDirection: "row" }}>
                  {children && <span>▶️</span>}
                  <div>{comment.text}</div>
                  <div>{comment.parent && comment.parent.id}</div>
                  <LikeComment comment={comment} />
                  <button onClick={() => setIsUpdateCommentOpen(true)}>수정</button>
                  {!children && <button onClick={() => setIsReCommentOpen(true)}>대댓글</button>}
                </div>
              )}
              {isReCommentOpen && (
                <div>
                  <textarea {...reComment} />
                  <button onClick={() => setIsReCommentOpen(false)}>취소</button>
                  <button
                    onClick={() => {
                      SaveComment();
                      reComment.onChange({ currentTarget: { value: "" } });
                      setIsReCommentOpen(false);
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

const CommentList = (props: ICommentListProps) => {
  const { poemId, comments } = props;
  if (comments.length > 0) {
    return <Comments poemId={poemId} comments={comments} />;
  } else {
    return <div>댓글이 없어요...</div>;
  }
};

export default CommentList;
