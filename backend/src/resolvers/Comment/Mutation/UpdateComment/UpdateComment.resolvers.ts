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
            comment.likes = [...comment.likes, user];
            comment.save();

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

          const comment = await Comment.findOne({ id: args.commentId });

          if (comment) {
            comment.text = args.text;
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
