/*
 * File: \src\resolvers\user.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Monday September 6th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Monday September 6th 2021 3:01:53 am
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { Arg, Int, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";

@Resolver()
export class UserResolver {
  // Find a specific user based on ID
  @Query(() => User, { description: "Returns a user based on id.", nullable: true })
  async user(@Arg("id", () => Int) id: number): Promise<User | undefined> {
    return await User.findOne(id);
  }
}