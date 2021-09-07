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
import {
  Arg,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { User } from "../entity/User";
import { FieldError } from "./FieldError";
import { validateAll } from "../utils/validate";
import { getConnection } from "typeorm";

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  /** register(username, password, email, firstName, lastName, age)=============
   * Register a user
   */
  @Mutation(() => UserResponse, {
    description: "Registers a user by saving new data to the db.",
    nullable: true,
  })
  async register(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Arg("email") email: string,
    @Arg("firstName", { nullable: true }) firstName: string,
    @Arg("lastName", { nullable: true }) lastName: string,
    @Arg("age", { nullable: true }) age: number
  ): Promise<UserResponse> {
    // Common validations;
    const validatorErrors = validateAll(username, password, email);
    if (validatorErrors) return { errors: validatorErrors };

    // Hash the plaintext password with Argon2
    const hashedPassword = await argon2.hash(password);

    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: username,
          password: hashedPassword,
          email: email,
          firstName: firstName ? firstName : null,
          lastName: lastName ? lastName : null,
          age: age ? age : null,
        })
        .returning("*")
        .execute();

      user = result.raw[0];
    } catch (e) {
      // Currently console logging, but we should send this to a
      // logger eventually.
      console.log(e);
    }

    return { user: user };
  }

  /** user(id)==================================================================
   * Find a user based on id
   */
  @Query(() => UserResponse, {
    description: "Returns a user based on id.",
    nullable: true,
  })
  async user(@Arg("id", () => Int) id: number): Promise<UserResponse> {
    return { user: await User.findOne(id) };
  }
}
