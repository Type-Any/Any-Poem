import User from "../../../../entities/User";
import createJWT from "../../../../utils/createJWT";
import { EmailSignInMutationArgs, EmailSignInResponse } from "./../../../../types/graph.d";

const resolvers = {
  Mutation: {
    EmailSignIn: async (_: any, args: EmailSignInMutationArgs): Promise<EmailSignInResponse> => {
      const { email, password } = args;

      try {
        const user = await User.findOne({ email });

        // if the email isn't found from User
        if (!user) {
          return {
            error: "there is no account with that email, please sign up first",
            ok: false,
            token: null
          };
        }

        const passwordCheck = await user.comparePassword(password);

        if (passwordCheck) {
          const token = await createJWT(user.id);
          return {
            error: null,
            ok: true,
            token
          };
        } else {
          return {
            error: "wrong password",
            ok: true,
            token: null
          };
        }
      } catch (error) {
        return {
          error: error.message,
          ok: false,
          token: null
        };
      }
    }
  }
};

export default resolvers;
