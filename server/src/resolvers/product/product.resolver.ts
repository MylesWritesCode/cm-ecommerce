/*
 * File: \src\resolvers\product.resolver.ts
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
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";

import { Context } from "../../context";
import { isAuth } from "../../middleware/isAuth";

// Entity
import { Product } from "../../entity/product.entity";
import { User } from "../../entity/user.entity";
import { ProductResponse } from "../../entity/product.response";

// Inputs
import { ProductInput, CreateProductInput } from "./product.input";

@Resolver(Product)
export class ProductResolver {
  /** createProduct(CreateProductInput)=========================================
   * Creates a product in the db
   */
  @Mutation(() => [ProductResponse])
  @UseMiddleware(isAuth)
  async createProduct(
    @Arg("data") data: CreateProductInput,
    @Ctx() { req }: Context
  ): Promise<typeof ProductResponse[]> {
    let product: Product;
    const user = await User.findOne(req.session.userId);

    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values({
          name: data.name,
          brand: data.brand,
          categories: data.categories,
          retailPrice: data.retailPrice,
          wholesalePrice: data.wholesalePrice,
          description: data.description,
          images: data.images,
          creator: user,
        })
        .returning("*")
        .execute();

      // The created product should be the first element in the array.
      product = result.raw[0];
    } catch (e) {
      console.log(e);

      // Code 23505 means that a unique field input already exists
      if (e.code === "23505") {
        if (e.detail.includes("name")) {
          // I guess this no longer matters
        }
      }
    }

    return [product];
  }

  /** product(productInput)=====================================================
   * Returns a single product - to be used for product pages. This will utilize
   * the Entity.findOne() method.
   */
  @Query(() => ProductResponse)
  async product(
    @Arg("data") data: ProductInput
  ): Promise<typeof ProductResponse> {
    let product: Product;
    try {
      const result = await Product.findOne({
        where: { ...data },
      });

      if (!result) {
        return {
          error: "product",
          message: "No products found.",
        };
      }
      product = result;
    } catch (e) {
      console.log(e);
    }

    return product;
  }

  /** products(productInput)====================================================
   * Returns an array of products - to be used for serving browsing pages. This
   * will utalize the Entity.find() method.
   */
  @Query(() => [ProductResponse])
  async products(
    @Arg("data") data: ProductInput
  ): Promise<typeof ProductResponse[]> {
    let product: Product[];

    try {
      const result = await Product.find({
        where: { ...data },
      });

      if (!result) {
        return [
          {
            error: "product",
            message: "No products found.",
          },
        ];
      }
      
      product = result;
    } catch (e) {
      console.log(e);
    }

    return product;
  }
}
