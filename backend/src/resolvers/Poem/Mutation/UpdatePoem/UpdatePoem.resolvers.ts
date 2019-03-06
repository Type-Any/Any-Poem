import Poem from "../../../../entities/Poem";
import User from "../../../../entities/User";
import { LikePoemMutationArgs, UpdatePoemMutationArgs, UpdatePoemResponse } from "../../../../types/graph";
import privateResolver from "../../../../utils/privateResolver";

const resolvers = {
  Mutation: {
    LikePoem: privateResolver(
      async (_: any, args: LikePoemMutationArgs, ctx: any): Promise<UpdatePoemResponse> => {
        try {
          const poem = await Poem.findOne({ where: { id: args.poemId }, relations: ["likes"] });

          if (!poem) {
            return {
              error: "Not Existing",
              ok: false,
              poem: null
            };
          }

          const user = await User.findOne({ id: ctx.userId });

          if (user) {
            const index = poem.likes.findIndex(liker => liker.id === user.id);
            if (index > -1) {
              poem.likes.splice(index, 1);
            } else {
              poem.likes = [...poem.likes, user];
            }

            await poem.save();
          } else {
            return {
              error: "Can't find the user",
              ok: false,
              poem: null
            };
          }

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
    ),
    UpdatePoem: privateResolver(
      async (_: any, args: UpdatePoemMutationArgs, ctx: any): Promise<UpdatePoemResponse> => {
        try {
          const poem = await Poem.findOne({ where: { id: args.poemId }, relations: ["poet"] });

          if (!poem) {
            return {
              error: "Not Existing",
              ok: false,
              poem: null
            };
          }

          if (poem.poet.id !== ctx.userId) {
            return {
              error: "Not Your Poem",
              ok: false,
              poem: null
            };
          }

          if (args.title) {
            poem.title = args.title;
          }
          if (args.text) {
            poem.text = args.text;
          }

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
