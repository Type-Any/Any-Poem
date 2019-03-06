import Poem from "../../../../entities/Poem";
import { DeletePoemMutationArgs, DeletePoemResponse } from "../../../../types/graph";
import privateResolver from "../../../../utils/privateResolver";

const resolvers = {
  Mutation: {
    DeletePoem: privateResolver(
      async (_: any, args: DeletePoemMutationArgs, ctx: any): Promise<DeletePoemResponse> => {
        try {
          const poem = await Poem.findOne({ where: { id: args.poemId }, relations: ["poet"] });

          if (!poem) {
            return {
              error: "Not Existing",
              ok: false
            };
          }

          if (poem.poet.id !== ctx.userId) {
            return {
              error: "Not Your Poem",
              ok: false
            };
          }

          await poem.remove();

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
