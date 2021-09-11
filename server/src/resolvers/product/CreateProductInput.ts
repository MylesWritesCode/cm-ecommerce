/*
 * File: \src\resolvers\inputs\CreateProductInput.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Friday September 10th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Friday September 10th 2021 5:35:40 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { InputType, Field, Float } from "type-graphql";

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  brand!: string;

  @Field(() => [String], { nullable: true })
  categories: string[];

  @Field(() => Float, { nullable: true })
  retailPrice: number;

  @Field(() => Float, { nullable: true })
  wholesalePrice: number;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => [String], { nullable: true })
  images: string[];
}
