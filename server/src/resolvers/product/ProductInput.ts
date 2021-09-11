/*
 * File: \src\resolvers\product\ProductInput.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Friday September 10th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Friday September 10th 2021 8:15:14 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { Field, InputType } from "type-graphql";

@InputType()
export class ProductInput {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  brand: string;

  @Field(() => [String], { nullable: true })
  categories: string[];
}
