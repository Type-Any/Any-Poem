import cookie from "cookie";
import redirect from "./redirect";

const logout = apolloClient => () => {
  document.cookie = cookie.serialize("token", "", {
    maxAge: -1
  });

  apolloClient.cache.reset().then(() => {
    // aplloClient 초기화를 위한 SSR routing
    window.location.href = "/";
  });
};

export default logout;
