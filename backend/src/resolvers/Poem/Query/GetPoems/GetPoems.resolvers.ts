import Poem from "../../../../entities/Poem";
import { GetPoemsQueryArgs, GetPoemsResponse } from "../../../../types/graph";
import { Like } from "typeorm";

const resolvers = {
  Query: {
    GetPoems: async (_: any, args: GetPoemsQueryArgs, ctx: any): Promise<GetPoemsResponse> => {
      try {
        const poems = await Poem.find({
          where: args.search
            ? [
                {
                  title: Like(`%${args.search}%`)
                },
                {
                  text: Like(`%${args.search}%`)
                }
              ]
            : {},
          relations: ["poet"],
          skip: args.skip,
          take: args.take,
          order: { id: "DESC" }
        });

        // const poems = await Poem.createQueryBuilder("poem")
        //   .where("poem.poet.penName = :penName", { penName: 2 })
        //   .getMany();

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
