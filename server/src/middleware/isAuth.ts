/*
 * File: \src\middleware\isAuth.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Saturday September 11th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Saturday September 11th 2021 5:51:58 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { MiddlewareFn } from "type-graphql";
import { Context } from "../context";

export const isAuth: MiddlewareFn<Context> = ({ context, info }, next) => {
  const returnTypeStr = info.returnType.toString();
  const noAuthError = {
    error: "auth",
    message: "User not authenticated.",
    code: "NO_AUTH",
  };

  if (!context.req.session.userId) {
    if (returnTypeStr.includes("[") && returnTypeStr.includes("]")) {
      return new Promise((resolve) => {
        resolve([noAuthError]); // Gets sent back to user
      });
    } else {
      return new Promise((resolve) => {
        resolve(noAuthError);
      });
    }
  }
  return next();
};
