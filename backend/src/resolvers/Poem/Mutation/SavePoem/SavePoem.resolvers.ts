import Poem from "../../../../entities/Poem";
import User from "../../../../entities/User";
import { SavePoemMutationArgs, SavePoemResponse } from "../../../../types/graph";
import privateResolver from "../../../../utils/privateResolver";

const resolvers = {
  Mutation: {
    SavePoem: privateResolver(
      async (_: any, args: SavePoemMutationArgs, ctx: any): Promise<SavePoemResponse> => {
        try {
          const poem = new Poem();

          const poet = await User.findOne({ id: ctx.userId });
          if (poet) {
            poem.poet = poet;
          } else {
            return {
              error: "Can't find the user",
              ok: false,
              poem: null
            };
          }

          poem.title = args.title;
          poem.text = args.text;
          poem.isPublished = false;
          await poem.save();

          return {
            error: null,
            ok: true,
            poem
          };
        } catch (error) {
          return {
            error: error.message,
            ok: false,
            poem: null
          };
        }
      }
    )
  }
};

export default resolvers;
