"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = void 0;
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
const env = process.env;
exports.ormConfig = {
    "type": "postgres",
    "host": env.DB_HOST,
    "port": env.DB_PORT,
    "username": env.DB_USER,
    "password": env.DB_PASS,
    "database": env.DB_NAME,
    "synchronize": true,
    "logging": true,
    "entities": ["src/entity/**/*.ts"],
    "migrations": ["src/migration/**/*.ts"],
    "subscribers": ["src/subscriber/**/*.ts"],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
};
//# sourceMappingURL=typeorm.js.map