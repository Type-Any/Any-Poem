/* eslint-disable import/first */
/* eslint-disable import/no-unresolved */
import dotenv from "dotenv";

dotenv.config();

import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";
import connectionOptions from "./ormConfig";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";
import { ContextParameters } from "graphql-yoga/dist/types";

const parseReqeustAuthorization = (request: ContextParameters) => {
  const authroization = request.request.get("Authorization");
  if (authroization) {
    const splitedAuth = authroization.split(" ");
    if (splitedAuth[0] === "X-JWT") {
      return splitedAuth[1];
    } else {
      return "";
    }
  } else {
    return "";
  }
};

const server = new GraphQLServer({
  schema,
  context: async (request: ContextParameters) => {
    let userId;

    const token = parseReqeustAuthorization(request) || request.request.cookies["X-JWT"] || "";
    if (token) {
      userId = await decodeJWT(token);
    }

    return { request, userId };
  }
});

createConnection(connectionOptions)
  .then(() => {
    server.start(() => console.log("> http://localhost:4000 is listening"));
  })
  .catch(err => console.log(err));
