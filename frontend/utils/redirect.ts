import Router from "next/router";
import { ctxWithApollo } from "../types/types";

export default (context: ctxWithApollo | any, target: string) => {
  if (context.res) {
    // server
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    Router.replace(target);
  }
};
