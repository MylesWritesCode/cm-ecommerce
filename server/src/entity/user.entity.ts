/*
 * File: \src\entity\user.entity.ts
 * Project: cm-ecommerce\cm-ecommerce-server
 * Created Date: Friday September 3rd 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Friday September 3rd 2021 11:30:37 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";

// Entities
import { Product } from "./product.entity";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column({ type: "varchar", length: 30, nullable: false, unique: true })
  username!: string;

  @Field(() => String)
  @Column({ type: "varchar", length: 30, nullable: false, unique: true })
  email!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", length: 30, nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", length: 30, nullable: true })
  lastName: string;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  age: number;

  // @Field(() => String) // Not shown in GraphQL
  @Column({ type: "text", nullable: false })
  password!: string;
  
  @Field(() => [String], { nullable: true })
  @OneToMany(() => Product, product => product.creator)
  products: Product[];

  // Created At
  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  // Updated At
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
