import Comment from "../../../../entities/Comment";
import { GetCommentsQueryArgs, GetCommentsResponse } from "../../../../types/graph";

const resolvers = {
  Query: {
    GetComments: async (_: any, args: GetCommentsQueryArgs, ctx: any): Promise<GetCommentsResponse> => {
      try {
        const comments = await Comment.find({
          where: { poem: { id: args.poemId } },
          skip: args.skip,
          take: args.take,
          order: { id: "DESC" }
        });
        if (comments) {
          return {
            comments,
            error: null,
            ok: true
          };
        } else {
          return {
            comments: null,
            error: "No Comments",
            ok: false
          };
        }
      } catch (error) {
        return { error: error.message, ok: false, comments: null };
      }
    }
  }
};

export default resolvers;
