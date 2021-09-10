/*
 * File: \src\resolvers\FieldError.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Tuesday September 7th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Tuesday September 7th 2021 2:53:28 am
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}