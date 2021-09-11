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
import { Field, InputType, Float } from "type-graphql";

/** ProductInput================================================================
 * General purpose input, for use when looking up different fields. 
 */
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

/** CreateProductInput==========================================================
 * For use with creating products within the resolver, specifically 
 * createProduct(). 
 */
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