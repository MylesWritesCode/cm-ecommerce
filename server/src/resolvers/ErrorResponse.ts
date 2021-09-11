/*
 * File: \src\resolvers\ErrorResponse.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Friday September 10th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Friday September 10th 2021 11:01:42 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ErrorResponse {
  @Field()
  error: string; 
  
  @Field()
  message: string;

  @Field()
  code?: string;
}