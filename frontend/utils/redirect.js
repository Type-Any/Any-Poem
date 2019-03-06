import Router from "next/router";

export default (context, target) => {
  if (context.res) {
    // server
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    Router.replace(target);
  }
};
