import React from "react";
import { Mutation, Query } from "react-apollo";
import { GetCommentsResponse } from "../../types/graph";
import useHandleInput from "../../utils/useHandleInput";
import CommentList from "./CommentList";
import { GET_COMMENTS, SAVE_COMMENT } from "./CommentsQueries";

interface IProps {
  poemId: number;
}

const Comments = (props: IProps) => {
  const comment = useHandleInput("");

  const { poemId } = props;
  return (
    <div>
      <Mutation
        mutation={SAVE_COMMENT}
        variables={{ poemId, text: comment.value }}
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
            } else {
              console.log(GetComments.error);
            }
          } else {
            console.log("Commens cache 업데이트 에러");
          }
        }}
      >
        {(SaveComment, { data, error }) => {
          if (data && !data.SaveComment.ok) {
            alert(data.SaveComment.error);
          }
          return (
            <div>
              <input type="text" {...comment} placeholder="댓글" />
              <button
                onClick={() => {
                  SaveComment();
                  comment.onChange({ currentTarget: { value: "" } });
                }}
              >
                댓글달기
              </button>
            </div>
          );
        }}
      </Mutation>
      <Query query={GET_COMMENTS} variables={{ poemId, skip: 0, take: 10 }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>Error :(</div>;
          }

          if (data.GetComments.ok) {
            const { comments }: GetCommentsResponse = data.GetComments;

            if (comments) {
              return (
                <div>
                  <CommentList poemId={poemId} comments={comments} />;
                </div>
              );
            } else {
              return <div>댓글이 없어요...</div>;
            }
          } else {
            console.log("GetComments 에러발생");
          }
        }}
      </Query>
    </div>
  );
};

export default Comments;
