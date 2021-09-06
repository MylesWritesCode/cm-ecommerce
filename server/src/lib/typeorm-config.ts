/*
 * File: \src\lib\ormconfig.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Friday September 3rd 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Friday September 3rd 2021 1:38:15 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { ConnectionOptions } from "typeorm";
const env = process.env;

export const ormConfig: ConnectionOptions = {
   "type": "postgres",
   "host": env.DB_HOST,
   "port": parseInt(env.DB_PORT),
   "username": env.DB_USER,
   "password": env.DB_PASS,
   "database": env.DB_NAME,
   "synchronize": true,
   "logging": true,
   "entities": [ "src/entity/**/*.ts" ],
   "migrations": [ "src/migration/**/*.ts" ],
   "subscribers": [ "src/subscriber/**/*.ts" ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   },
   "connectTimeoutMS": 10000
};