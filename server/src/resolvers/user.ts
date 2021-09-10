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
  Ctx,
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
import { validateAll, validateLogin } from "../utils/validate";
import { getConnection } from "typeorm";
import { Context } from "src/types/context";


const env = process.env;

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
    @Arg("age", { nullable: true }) age: number,
    @Ctx() { req }: Context
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

    // Set the user session when they first register...
    req.session.userId = user.id;

    // ...then return the user.
    return { user: user };
  }

  /** login(email || username, password)========================================
   * Logs a user in with email and password
   */
  @Query(() => UserResponse, {
    description: "Logs a user in with an email and password",
  })
  async login(
    @Arg("login", () => String) loginCredentialName: string,
    @Arg("password", () => String) password: string,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    // General login error
    const loginError = {
      errors: [
        {
          field: "login",
          message: "Login information does not match our records.",
        },
      ],
    };

    // Again, error validation
    const validatorErrors = validateLogin(loginCredentialName, password);
    if (validatorErrors) return { errors: validatorErrors };

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
    return { user: user };
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
      })
    })
  }

  /** me()======================================================================
   * Returns the current user object based on the session cookie.
   */
  @Query(() => UserResponse, {
    description: "Returns the current user.",
  })
  async me(@Ctx() { req }: Context): Promise<UserResponse> {
    if (!req.session.userId) {
      return {
        errors: [
          { field: "user", message: "You are currently not authenticated." },
        ],
      };
    }
    
    return {
      user: await User.findOne({ where: { id: req.session.userId }})
    };
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
