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
import cors from "cors";

import { ormConfig } from "./lib/typeorm-config"; // TypeORM Config

const main = async() => {
  const conn = await createConnection(ormConfig);
}

main().catch((error => {
  console.log(error);
}));