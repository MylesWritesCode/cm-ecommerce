/*
 * File: \src\entity\Product.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Friday September 10th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Friday September 10th 2021 1:57:04 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { Field, Float, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column({ type: "varchar", length: 50, nullable: false })
  name!: string;

  @Field(() => String)
  @Column({ type: "varchar", length: 30, nullable: false })
  brand!: string;

  @Field(() => [String])
  @Column({ type: "text", array: true })
  categories: string[];

  @Field(() => Float)
  @Column({ type: "float", nullable: true })
  retailPrice: number;

  @Field(() => Float)
  @Column({ type: "float", nullable: true })
  wholesalePrice: number;

  @Field(() => String)
  @Column({ type: "text", nullable: false })
  description: string;

  @Field(() => [String])
  @Column({ type: "text", array: true })
  images: string[];

  @ManyToOne(() => User, user => user.products)
  creator: string;

  @Field(() => String)
  @Column({ type: "text", nullable: true })
  sellerCompany: string;
}
