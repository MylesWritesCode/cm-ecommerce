/*
 * File: \src\index.ts
 * Project: ecommerce\server
 * Created Date: Friday September 3rd 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Friday September 3rd 2021 1:38:15 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import "reflect-metadata";
import "./environment/environment"; // set dotenv

import { createConnection } from "typeorm";
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { ormConfig } from "./lib/typeorm-config"; // TypeORM Config

// Resolvers for Apollo setup. Probably going to move to a different file
// when I have everything set up.
import { UserResolver } from "./resolvers/user";

const main = async() => {
  const env = process.env;
  console.log(env.NODE_ENV);
  // Attempt to open a connection to  the db
  console.log("Attempting to connect to the db...");
  const conn = await createConnection(ormConfig);
  
  const app = express();

  // CORS setup
  app.use(
    cors({
      origin: `${ env.CLIENT_URL }:${ env.CLIENT_PORT }`,
      credentials: true,
    })
  )

  // Connect to redis...
  const RedisStore: connectRedis.RedisStore = connectRedis(session);
  const redis: Redis.Redis = new Redis({});

  // ...and set up store and cookie data
  app.use(
    session({
      name: env.COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day expiry
        sameSite: "lax",
        httpOnly: true,
        secure: env.NODE_ENV === "production"
      },
      saveUninitialized: false,
      secret: env.REDIS_SECRET,
      resave: false,
    })
  );

  // Setup GraphQL with Apollo
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ UserResolver ],
      validate:  false
    })
  });


  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(env.SERVER_PORT, () => {
    console.log(`Server started on localhost:${ env.SERVER_PORT }...`);
  });
}

main().catch((error) => {
  console.log(error);
});