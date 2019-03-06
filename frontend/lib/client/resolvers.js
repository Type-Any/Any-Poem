import { GET_ISLOGIN } from "./queries";

const resolvers = {
  Mutation: {
    setIsLogin: (_, variables, { cache }) => {
      cache.writeQuery({
        query: GET_ISLOGIN,
        data: {
          isLogin: variables.isLogin
        }
      });
      return null;
    }
  }
};

export default resolvers;
