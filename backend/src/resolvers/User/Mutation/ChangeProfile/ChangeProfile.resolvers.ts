import User from "../../../../entities/User";
import { ChangeProfileMutationArgs, ChangeProfileResponse } from "../../../../types/graph";
import privateResolver from "../../../../utils/privateResolver";

const resolvers = {
  Mutation: {
    ChangeProfile: privateResolver(
      async (_: any, args: ChangeProfileMutationArgs, ctx: any): Promise<ChangeProfileResponse> => {
        const userId: number = ctx.userId;
        const { penName, bio, avatar } = args;

        try {
          const user = await User.findOne({ id: userId });

          if (user) {
            if (penName) {
              user.penName = penName;
            }
            if (bio) {
              user.bio = bio;
            }
            if (avatar) {
              user.avatar = avatar;
            }

            user.save();

            return {
              ok: true,
              error: null,
              user
            };
          } else {
            return {
              ok: false,
              error: "User not found",
              user: null
            };
          }
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            user: null
          };
        }
      }
    )
  }
};

export default resolvers;
