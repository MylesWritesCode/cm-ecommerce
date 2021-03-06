/*
 * File: \src\resolvers\order.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Friday September 10th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Friday September 10th 2021 1:58:14 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { Resolver } from "type-graphql";
import { } from "typeorm";

// Entity
import { Order } from "../../entity/order.entity";

@Resolver(Order)
export class OrderResolver {

}