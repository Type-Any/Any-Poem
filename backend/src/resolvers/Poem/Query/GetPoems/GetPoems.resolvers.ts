import Poem from "../../../../entities/Poem";
import { GetPoemsQueryArgs, GetPoemsResponse } from "../../../../types/graph";

const resolvers = {
  Query: {
    GetPoems: async (_: any, args: GetPoemsQueryArgs, ctx: any): Promise<GetPoemsResponse> => {
      try {
        const poems = await Poem.find({ skip: args.skip, take: args.take });
        if (poems) {
          return {
            error: null,
            ok: true,
            poems
          };
        } else {
          return {
            error: "No Poems",
            ok: false,
            poems: null
          };
        }
      } catch (error) {
        return { error: error.message, ok: false, poems: null };
      }
    }
  }
};

export default resolvers;
