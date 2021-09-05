"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = void 0;
const env = process.env;
exports.ormConfig = {
    "type": "postgres",
    "host": env.DB_HOST,
    "port": parseInt(env.DB_PORT),
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
//# sourceMappingURL=typeorm-config.js.map