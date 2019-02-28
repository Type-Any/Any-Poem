import Poem from "../../../../entities/Poem";
import { GetPoemsQueryArgs, GetPoemsResponse } from "../../../../types/graph";

const resolvers = {
  Query: {
    GetPoems: async (_: any, args: GetPoemsQueryArgs, ctx: any): Promise<GetPoemsResponse> => {
      try {
        const poems = await Poem.createQueryBuilder("poem")
          .leftJoinAndSelect("poem.poet", "poet")
          .where("poem.title Like :title OR poem.text Like :text", {
            title: `%${args.search}%`,
            text: `%${args.search}%`
          })
          .orWhere("poet.penName Like :penName", { penName: `%${args.search}%` })
          .getMany();

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
