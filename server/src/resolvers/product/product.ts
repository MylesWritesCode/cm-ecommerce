/*
 * File: \src\resolvers\product.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Friday September 10th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Friday September 10th 2021 1:58:25 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import {} from "typeorm";

import { Context } from "src/types/context";
import { CreateProductInput } from "./CreateProductInput";
import { FieldError } from "../FieldError";

// Entity
import { Product } from "../../entity/Product";

@ObjectType()
class ProductResponse {
  @Field(() => Product, { nullable: true })
  product?: Product;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@Resolver(Product)
export class ProductResolver {
  /** createProduct(CreateProductInput)========================================
   * Creates a product in the db
   */
  @Mutation(() => ProductResponse)
  async createProduct(
    @Arg("data") data: CreateProductInput,
    @Ctx() { req }: Context
  ): Promise<ProductResponse> {}
}
