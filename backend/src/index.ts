/* eslint-disable import/first */
/* eslint-disable import/no-unresolved */
import dotenv from "dotenv";

dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import { createConnection } from "typeorm";
import connectionOptions from "./ormConfig";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(helmet());
app.use(cookieParser());

const server = new GraphQLServer({
  schema,
  context: async (request: any) => {
    let userId;

    const token = request.request.get("X-JWT") || "";
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
