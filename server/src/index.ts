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
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { ormConfig } from "./lib/typeorm-config";
import { Context } from "./context/context";

// Resolvers
import { ProductResolver } from "./resolvers/product";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  const env = process.env;

  // Attempt to open a connection to  the db
  console.log("Attempting to connect to the db...");
  const conn = await createConnection(ormConfig);

  const app = express();

  // CORS setup
  const corsOrigins = [`${env.CLIENT_URL}:${env.CLIENT_PORT}`];

  // If we're not in production, we probably need access to Apollo's GraphQL
  // application. Below adds the Apollo server url to the origin array.
  if (env.NODE_ENV !== "production") {
    corsOrigins.push("https://studio.apollographql.com");
  }

  app.use(
    cors({
      origin: corsOrigins,
      credentials: true,
    })
  );

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
        httpOnly: true,
        sameSite: "lax",
        secure: env.NODE_ENV === "production",
      },
      saveUninitialized: false,
      secret: env.REDIS_SECRET,
      resave: false,
    })
  );

  // Setup GraphQL with Apollo
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, ProductResolver],
      validate: false,
    }),
    context: ({ req, res }): Context => ({ req, res, redis }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(env.SERVER_PORT, () => {
    console.log(`Server started on localhost:${env.SERVER_PORT}...`);
  });
};

main().catch((error) => {
  console.log(error);
});
