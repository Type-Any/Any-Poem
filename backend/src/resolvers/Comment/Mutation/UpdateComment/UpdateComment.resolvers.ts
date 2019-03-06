import Comment from "../../../../entities/Comment";
import User from "../../../../entities/User";
import { LikeCommentMutationArgs, UpdateCommentMutationArgs, UpdateCommentResponse } from "../../../../types/graph";
import privateResolver from "../../../../utils/privateResolver";

const resolvers = {
  Mutation: {
    LikeComment: privateResolver(
      async (_: any, args: LikeCommentMutationArgs, ctx: any): Promise<UpdateCommentResponse> => {
        try {
          const comment = await Comment.findOne({ where: { id: args.commentId }, relations: ["likes"] });

          const user = await User.findOne({ id: ctx.userId });
          if (!user) {
            return {
              comment: null,
              error: "Can't find the user",
              ok: false
            };
          }

          if (comment) {
            const index = comment.likes.findIndex(liker => liker.id === user.id);
            if (index > -1) {
              comment.likes.splice(index, 1);
            } else {
              comment.likes = [...comment.likes, user];
            }
            await comment.save();

            return {
              comment,
              error: null,
              ok: true
            };
          } else {
            return {
              comment: null,
              error: "Can't find the comment",
              ok: false
            };
          }
        } catch (error) {
          return {
            comment: null,
            error: error.message,
            ok: false
          };
        }
      }
    ),
    UpdateComment: privateResolver(
      async (_: any, args: UpdateCommentMutationArgs, ctx: any): Promise<UpdateCommentResponse> => {
        try {
          if (!args.text || args.text === "") {
            return {
              comment: null,
              error: "No comment text",
              ok: false
            };
          }

          const comment = await Comment.findOne({ where: { id: args.commentId }, relations: ["commenter"] });

          if (comment) {
            if (comment.commenter.id !== ctx.userId) {
              return {
                comment: null,
                error: "Not your comment",
                ok: false
              };
            } else {
              comment.text = args.text;
            }
            await comment.save();

            return {
              comment,
              error: null,
              ok: true
            };
          } else {
            return {
              comment: null,
              error: "Can't find the comment",
              ok: false
            };
          }
        } catch (error) {
          return {
            comment: null,
            error: error.message,
            ok: false
          };
        }
      }
    )
  }
};

export default resolvers;
