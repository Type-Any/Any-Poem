import Poem from "../../../../entities/Poem";
import { GetMyPoemsQueryArgs, GetPoemsResponse } from "../../../../types/graph";
import privateResolver from "../../../../utils/privateResolver";

const resolvers = {
  Query: {
    GetMyPoems: privateResolver(
      async (_: any, args: GetMyPoemsQueryArgs, ctx: any): Promise<GetPoemsResponse> => {
        try {
          const myPoems = await Poem.find({ where: { poet: { id: ctx.userId } }, skip: args.skip, take: args.take });
          if (myPoems) {
            return {
              error: null,
              ok: true,
              poems: myPoems
            };
          } else {
            return {
              error: "No Poems",
              ok: false,
              poems: null
            };
          }
        } catch (error) {
          return {
            error: error.message,
            ok: false,
            poems: null
          };
        }
      }
    )
  }
};

export default resolvers;
