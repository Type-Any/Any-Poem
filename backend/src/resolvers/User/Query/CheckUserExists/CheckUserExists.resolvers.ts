import User from "../../../../entities/User";
import { CheckUserExistsQueryArgs, CheckUserExistsResponse } from "../../../../types/graph";

const resolvers = {
  Query: {
    CheckUserExists: async (_: any, args: CheckUserExistsQueryArgs, ctx: any): Promise<CheckUserExistsResponse> => {
      try {
        let user: User | undefined;
        if (args.email) {
          user = await User.findOne({ email: args.email });
        }
        if (args.oauthId) {
          user = await User.findOne({ oauthId: args.oauthId });
        }
        if (user) {
          return {
            error: null,
            ok: true,
            user: user
          };
        } else {
          return {
            error: "User Not Found",
            ok: false,
            user: null
          };
        }
      } catch (error) {
        return {
          error: error.message,
          ok: false,
          user: null
        };
      }
    }
  }
};

export default resolvers;
