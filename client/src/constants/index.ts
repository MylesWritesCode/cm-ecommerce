/*
 * File: \src\constants\index.ts
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Sunday September 19th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Sunday September 19th 2021 6:57:19 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { NavbarConfig } from "./NavbarConfig";

export * from "./MenuConfig";
export * from "./NavbarConfig";
export * from "./ProductsConfig";

// Viewheight - navbar height
export const VH = `calc(100vh - ${NavbarConfig.height})`;
