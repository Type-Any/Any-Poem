import Poem from "../../../../entities/Poem";
import { GetPoemQueryArgs, GetPoemResponse } from "../../../../types/graph";

const resolvers = {
  Query: {
    GetPoem: async (_: any, args: GetPoemQueryArgs, ctx: any): Promise<GetPoemResponse> => {
      try {
        const poem = await Poem.findOne({ id: args.poemId });
        if (poem) {
          return {
            error: null,
            ok: true,
            poem: poem
          };
        } else {
          return {
            error: "No Poems",
            ok: false,
            poem: null
          };
        }
      } catch (error) {
        return {
          error: error.message,
          ok: false,
          poem: null
        };
      }
    }
  }
};

export default resolvers;
