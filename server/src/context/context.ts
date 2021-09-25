/*
 * File: \src\types\context.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Thursday September 9th 2021
 * Author: Myles Berueda
 * Notes: The context will be used pass requests, responses, and redis data
 *        throughout the application
 * -----
 * Last Modified: Thursday September 9th 2021 4:03:40 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import Redis from "ioredis";

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

export type Context = {
  req: Request & {
    session: Session & Partial<SessionData>;
  };
  res: Response;
  redis: Redis.Redis;
};
