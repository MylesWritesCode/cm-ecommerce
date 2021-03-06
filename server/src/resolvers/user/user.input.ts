/*
 * File: \src\resolvers\user\user.input.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Friday September 10th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Friday September 10th 2021 5:57:08 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { InputType, Field, Int } from "type-graphql";

/** ============================================================================
 * For use with register route, given that the username, email, and password
 * are all required with this input.
 */
@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: false })
  username!: string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;

  @Field(() => Int, { nullable: true })
  age: number;
}
