/*
 * File: \src\entity\user.response.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Saturday September 11th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Saturday September 11th 2021 1:22:51 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { createUnionType } from "type-graphql";

import { User } from "./user.entity";
import { GeneralError } from "./general.error";

export const UserResponse = createUnionType({
  name: "UserResponse",
  types: () => [ User, GeneralError ],
  resolveType: value => {
    if ("error" in value) {
      return GeneralError;
    }
    if ("username" in value) {
      return User;
    }
  }
})