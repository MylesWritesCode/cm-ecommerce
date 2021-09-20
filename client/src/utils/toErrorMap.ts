/*
 * File: \src\utils\toErrorMap.ts
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Sunday September 19th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Sunday September 19th 2021 9:10:19 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { UserResponse } from "../generated/graphql";

export const toErrorMap = (responses: UserResponse[]) => {
  console.log("responses: ", responses);
  const errorMap: Record<string, string> = {};
  
  responses.forEach((response) => {
    if (response.__typename === "GeneralError") {
      errorMap[response.error] = response.message;
    }
  });

  return errorMap;
};
