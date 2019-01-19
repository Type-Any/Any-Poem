import User from "../../../../entities/User";
import { EmailSignUpMutationArgs, EmailSignUpResponse } from "../../../../types/graph";

const resolvers = {
  Mutation: {
    EmailSignUp: async (_: any, args: EmailSignUpMutationArgs): Promise<EmailSignUpResponse> => {
      try {
        const { email } = args;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            error: "This email has signed up already, please sign in",
            ok: false,
            user: null
          };
        } else {
          const user = await User.create({ ...args }).save();
          if (user) {
            return {
              error: null,
              ok: true,
              user
            };
          } else {
            return {
              error: "Registering Failed",
              ok: false,
              user: null
            };
          }
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
