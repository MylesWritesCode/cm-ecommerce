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
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

import { Context } from "src/types/context";

// Entity
import { Product } from "../../entity/product.entity";
import { User } from "../../entity/user.entity";

// Inputs
import { ProductInput, CreateProductInput } from "./product.input";

@Resolver(Product)
export class ProductResolver {
  /** createProduct(CreateProductInput)=========================================
   * Creates a product in the db
   */
  @Mutation(() => Product)
  async createProduct(
    @Arg("data") data: CreateProductInput,
    @Ctx() { req }: Context
  ): Promise<Product | ErrorResponse> {
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
          creator: user
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
          return {
            error: "name",
            message: "That product name is taken",
          };
        }
      }
    }

    return product;
  }

  /** product(productInput)=====================================================
   * Returns a single product - to be used for product pages. This will utilize
   * the Entity.findOne() method.
   */
  @Query(() => Product || ErrorResponse)
  async product(
    @Arg("data") data: ProductInput
  ): Promise<Product | ErrorResponse> {
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
  @Query(() => [Product] || ErrorResponse)
  async products(): Promise<Product[] | ErrorResponse> {
    return {
      error: "n/a", message: "this is not implemented yet"
    }
  }
}
