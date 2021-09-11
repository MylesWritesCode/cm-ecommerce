/*
 * File: \src\resolvers\GeneralError.ts
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
export class GeneralError {
  @Field()
  error: string; 
  
  @Field()
  message: string;

  @Field({ nullable: true })
  code?: string;
}

@ObjectType()
export class GeneralErrors {
  @Field(() => [GeneralError])
  errors: GeneralError[];
}