import User from "../../../../entities/User";
import { EmailSignUpMutationArgs, EmailSignUpResponse } from "../../../../types/graph";
import createJWT from "../../../../utils/createJWT";

const resolvers = {
  Mutation: {
    EmailSignUp: async (_: any, args: EmailSignUpMutationArgs): Promise<EmailSignUpResponse> => {
      try {
        const { email, password, oauthId, fullName, penName } = args;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            error: "This email has signed up already, please sign in",
            ok: false,
            token: null,
            user: null
          };
        } else {
          if (password) {
            const user = new User();
            user.email = email;
            await user.setPassword(password);
            user.fullName = fullName;
            user.penName = penName;
            await user.save();

            const token = await createJWT(user.id);
            if (user) {
              return {
                error: null,
                ok: true,
                token,
                user
              };
            } else {
              return {
                error: "Registering Failed",
                ok: false,
                token: null,
                user: null
              };
            }
          } else if (oauthId) {
            const user = new User();
            user.email = email;
            user.oauthId = oauthId;
            user.fullName = fullName;
            user.penName = penName;
            await user.save();

            const token = await createJWT(user.id);
            if (user) {
              return {
                error: null,
                ok: true,
                token,
                user
              };
            } else {
              return {
                error: "Registering Failed",
                ok: false,
                token: null,
                user: null
              };
            }
          } else {
            return {
              error: "Password or OauthID is required",
              ok: false,
              token: null,
              user: null
            };
          }
        }
      } catch (error) {
        return {
          error: error.message,
          ok: false,
          token: null,
          user: null
        };
      }
    }
  }
};

export default resolvers;
