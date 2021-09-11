/*
 * File: \src\entity\product.response.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Saturday September 11th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Saturday September 11th 2021 4:15:46 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { createUnionType } from "type-graphql";
import { Product } from "./product.entity";
import { GeneralError } from "./general.error";

export const ProductResponse = createUnionType({
  name: "ProductResponse",
  types: () => [ Product, GeneralError ],
  resolveType: value => {
    if ("error" in value) { return GeneralError; }
    if ("name" in value) { return Product; }
  }
});