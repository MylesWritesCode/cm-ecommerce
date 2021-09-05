"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
require("reflect-metadata");
require("./environment/environment"); // set dotenv
const typeorm_1 = require("typeorm");
const typeorm_config_1 = require("./lib/typeorm-config"); // TypeORM Config
const main = async () => {
    const conn = await (0, typeorm_1.createConnection)(typeorm_config_1.ormConfig);
};
main().catch((error => {
    console.log(error);
}));
//# sourceMappingURL=index.js.map