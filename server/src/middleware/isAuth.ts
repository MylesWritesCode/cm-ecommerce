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
    code: "NO_AUTH"
  };
  
  console.log(context.req.session.userId);
  
  return new Promise((resolve) => {
    if (!context.req.session.userId) {
      // The return type will either be a response - e.g. UserResponse - or an
      // array - e.g. UserResponse[]. In order to generalize this middleware,
      // I'm going to just search the return type string for brackets.
      if (returnTypeStr.includes("[") && returnTypeStr.includes("]")) {
        // If the return type as a string includes both '[' and ']', we should 
        // be able to assume that the resolver needs to return an array of some
        // sort. Knowing this, we can resolve isAuth to send back the response 
        // in the form of an array.
        resolve([noAuthError]);               // Gets sent back to user
        throw new Error(noAuthError.message); // Stops the op
      } else {
        // And if the return type doesn't have brackets, that means that the
        // response from isAuth shouldn't be in an array - e.g. the resolver is
        // expecting to return UserResponse instead of UserResponse[]. Because
        // of this we'll just send the not-authenticated-message.
        resolve(noAuthError);
        throw new Error(noAuthError.message);
      }
    }
    
    return next();
  });
};
