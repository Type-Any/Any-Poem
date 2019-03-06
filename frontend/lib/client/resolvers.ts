import ApolloClient from "apollo-client";
import { GET_ISLOGIN } from "./queries";

const resolvers = {
  Mutation: {
    setIsLogin: (_: any, variables: { isLogin: boolean }, { cache }: ApolloClient<any>) => {
      cache.writeQuery({
        data: {
          isLogin: variables.isLogin
        },
        query: GET_ISLOGIN
      });
      return null;
    }
  }
};

export default resolvers;
