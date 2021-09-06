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
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { ormConfig } from "./lib/typeorm-config"; // TypeORM Config

// Resolvers for Apollo setup. Probably going to move to a different file
// when I have everything set up.
import { UserResolver } from "./resolvers/user";

const main = async() => {
  const env = process.env;
  
  // Attempt to open a connection to  the db
  console.log("Attempting to connect to the db...");
  const conn = await createConnection(ormConfig);
  
  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ UserResolver ],
      validate:  false
    })
  })

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(env.SERVER_PORT, () => {
    console.log(`Server started on localhost:${ env.SERVER_PORT }...`);
  });
}

main().catch((error) => {
  console.log(error);
});