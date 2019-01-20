import cookie from "cookie";
import redirect from "./redirect";

const logout = apolloClient => () => {
  console.log("logout");
  document.cookie = cookie.serialize("token", "", {
    maxAge: -1
  });

  apolloClient.cache.reset().then(() => {
    redirect({}, "/");
  });
};

export default logout;
