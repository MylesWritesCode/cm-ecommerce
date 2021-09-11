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

  @Field(() => [String])
  categories: string[];

  @Field(() => Float)
  retailPrice: number;

  @Field(() => Float)
  wholesalePrice: number;

  @Field(() => String)
  description: string;

  @Field(() => [String])
  images: string[];
}
