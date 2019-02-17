import Comment from "../../../../entities/Comment";
import { DeleteCommentMutationArgs, DeleteCommentResponse } from "../../../../types/graph";
import privateResolver from "../../../../utils/privateResolver";

const resolvers = {
  Mutation: {
    DeleteComment: privateResolver(
      async (_: any, args: DeleteCommentMutationArgs, ctx: any): Promise<DeleteCommentResponse> => {
        try {
          const comment = await Comment.findOne({ where: { id: args.commentId }, relations: ["commenter"] });

          if (!comment) {
            return {
              error: "Not Existing",
              ok: false
            };
          }

          if (comment.commenter.id !== ctx.userId) {
            return {
              error: "Not Your Comment",
              ok: false
            };
          }

          await comment.remove();

          return {
            error: null,
            ok: true
          };
        } catch (error) {
          return {
            error: error.message,
            ok: false
          };
        }
      }
    )
  }
};

export default resolvers;
