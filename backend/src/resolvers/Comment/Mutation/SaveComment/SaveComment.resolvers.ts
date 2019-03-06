import Comment from "../../../../entities/Comment";
import Poem from "../../../../entities/Poem";
import User from "../../../../entities/User";
import { SaveCommentMutationArgs, SaveCommentResponse } from "../../../../types/graph";
import privateResolver from "../../../../utils/privateResolver";

const resolvers = {
  Mutation: {
    SaveComment: privateResolver(
      async (_: any, args: SaveCommentMutationArgs, ctx: any): Promise<SaveCommentResponse> => {
        try {
          const comment = new Comment();

          const commenter = await User.findOne({ id: ctx.userId });
          if (commenter) {
            comment.commenter = commenter;
          } else {
            return {
              comment: null,
              error: "Can't find the user",
              ok: false
            };
          }

          const poem = await Poem.findOne({ id: args.poemId });
          if (poem) {
            comment.poem = poem;
          } else {
            return {
              comment: null,
              error: "Can't find the poem",
              ok: false
            };
          }

          let parentComment: Comment | undefined;
          if (args.parentId) {
            parentComment = await Comment.findOne({ where: { id: args.parentId }, relations: ["children"] });
            if (parentComment) {
              comment.parent = parentComment;
            } else {
              return {
                comment: null,
                error: "Can't find the parent comment",
                ok: false
              };
            }
          }

          if (args.text) {
            comment.text = args.text;
          }

          await comment.save();

          if (parentComment) {
            parentComment.children = [...parentComment.children, comment];
            await parentComment.save();
          }

          return {
            comment,
            error: null,
            ok: true
          };
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
