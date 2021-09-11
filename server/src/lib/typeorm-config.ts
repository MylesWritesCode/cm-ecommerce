/*
 * File: \src\lib\ormconfig.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Friday September 3rd 2021
 * Author: Myles Berueda
 * Note: For logging options, check the following resource.
 *       
 * -----
 * Last Modified: Friday September 3rd 2021 1:38:15 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 * 10/09/2021 - myles.berueda
 * Added comments for logging info. Check the kanban board for more info.
 * https://bit.ly/38W4nWT
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
   "entities": [ "src/entity/**/*.ts" ],
   "migrations": [ "src/migration/**/*.ts" ],
   "subscribers": [ "src/subscriber/**/*.ts" ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   },
   "connectTimeoutMS": 10000,
   /**
    * Logger options
    * We can use the following logging options (or simply just true) to set
    * the level of logging to the console that you want for the app. In this
    * case, I'm opting to not output errors unless I want to via console.log
    * "logging": [ "query", "error", "schema", "warn", "info", "log" ]
    * https://github.com/typeorm/typeorm/blob/master/docs/logging.md
    */
   "logging": [ "query", "error", "schema", "warn", "info", "log" ], 
};