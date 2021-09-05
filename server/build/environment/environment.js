"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * File: \src\environment\environment.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Saturday September 4th 2021
 * Author: Myles Berueda
 * Note: .env files don't need to be in the build folder, but definitely need
 *       to be in the source folders. In production, we'll set this through
 *       other means such as Docker secrets or env values in the VM. It's
 *       important to be cognizant of how we're accessing secret values, as the
 *       code won't change between production and development. Instead, make
 *       sure to use process.env by setting this to some constant.
 *
 *       Make sure to change the second argument in path.join to whatever your
 *       .env file is in this folder.
 * -----
 * Last Modified: Saturday September 4th 2021 11:48:00 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envPath = path_1.default.join(__dirname, ".env.development");
const result = dotenv.config({ path: envPath });
if (result.error)
    throw result.error;
console.log(result);
//# sourceMappingURL=environment.js.map