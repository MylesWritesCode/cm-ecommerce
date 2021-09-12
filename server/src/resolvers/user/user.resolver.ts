/*
 * File: \src\resolvers\user.entity.ts
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
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import argon2 from "argon2";
import { getConnection } from "typeorm";

import { validateAll, validateLogin } from "../../utils/validate";
import { Context } from "src/types/context";

// Entity
import { User } from "../../entity/user.entity";
import { UserResponse } from "../../entity/user.response";

// Inputs
import { CreateUserInput } from "./user.input";

// Env variables
const env = process.env;

@Resolver(User)
export class UserResolver {
  /** register(username, password, email, firstName, lastName, age)=============
   * Register a user
   */
  @Mutation(() => [UserResponse], {
    description: "Registers a user by saving new data to the db.",
    nullable: true,
  })
  async register(
    @Arg("data") data: CreateUserInput,
    @Ctx() { req }: Context
  ): Promise<typeof UserResponse[]> {
    // Common validations;
    const validatorErrors = validateAll(
      data.username,
      data.password,
      data.email
    );

    if (validatorErrors) {
      return validatorErrors;
    }

    // Hash the plaintext password with Argon2
    const hashedPassword = await argon2.hash(data.password);

    let user: User;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: data.username,
          password: hashedPassword,
          email: data.email,
          firstName: data.firstName ? data.firstName : null,
          lastName: data.lastName ? data.lastName : null,
          age: data.age ? data.age : null,
        })
        .returning("*")
        .execute();

      user = result.raw[0];
    } catch (e) {
      // Code 23505 means that a unique field input already exists
      if (e.code === "23505") {
        if (e.detail.includes("email")) {
          return [{ error: "email", message: "That email already exists." }];
        }
        if (e.detail.includes("username")) {
          return [
            { error: "username", message: "That username already exists." },
          ];
        }
      }
    }

    // Set the user session when they first register...
    req.session.userId = user.id;

    // ...then return the user.
    return [user];
  }

  /** login(email || username, password)========================================
   * Logs a user in with email and password
   */
  @Query(() => [UserResponse], {
    description: "Logs a user in with an email and password",
  })
  async login(
    @Arg("login", () => String) loginCredentialName: string,
    @Arg("password", () => String) password: string,
    @Ctx() { req }: Context
  ): Promise<typeof UserResponse[]> {
    // General login error
    const loginError = [
      {
        error: "login",
        message: "Login information does not match our records.",
      },
    ];

    // Again, error validation
    const validatorErrors = validateLogin(loginCredentialName, password);
    if (validatorErrors) {
      return validatorErrors;
    }

    // First we need to get the user
    const user = await User.findOne(
      loginCredentialName.includes("@")
        ? { where: { email: loginCredentialName } }
        : { where: { username: loginCredentialName } }
    );

    if (!user) return loginError;

    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) return loginError;

    req.session.userId = user.id;
    return [user];
  }

  /** logout()==================================================================
   * Logs a user out based on session user id.
   */
  @Query(() => Boolean)
  async logout(@Ctx() { req, res }: Context): Promise<Boolean> {
    return new Promise((resolve) => {
      // Attempts to destroy the cookie. This will also remove the data from
      // redis (at least in my testing).
      req.session.destroy((error) => {
        if (error) {
          // If we have an error, console.log it and return false. I'll leave
          // it like this for now, but I want to set up some logger that will
          // catch all of these.
          console.log(error);
          resolve(false);
          return;
        }
        // If there's no error, send the response to the client, destroying
        // the cookie in the browser, then return true.
        res.clearCookie(env.COOKIE_NAME);
        resolve(true);
      });
    });
  }

  /** me()======================================================================
   * Returns the current user object based on the session cookie.
   */
  @Query(() => UserResponse, {
    description: "Returns the current user.",
  })
  async me(@Ctx() { req }: Context): Promise<typeof UserResponse> {
    if (!req.session.userId) {
      return { error: "user", message: "You are currently not authenticated." };
    }

    return await User.findOne({ where: { id: req.session.userId } });
  }

  /** user(id)==================================================================
   * Find a user based on id
   */
  @Query(() => UserResponse, {
    description: "Returns a user based on id.",
    nullable: true,
  })
  async user(@Arg("id", () => Int) id: number): Promise<typeof UserResponse> {
    return await User.findOne(id);
  }
}
