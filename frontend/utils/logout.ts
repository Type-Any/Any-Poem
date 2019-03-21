import { ApolloClient } from "apollo-client";
import cookie from "cookie";

const logout = (apolloClient: ApolloClient<any>) => () => {
  document.cookie = cookie.serialize("anypoemJWT", "", {
    maxAge: -1
  });

  apolloClient.cache.reset().then(() => {
    // aplloClient 초기화를 위한 SSR routing
    window.location.href = "/";
  });
};

export default logout;
